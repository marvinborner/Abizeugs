#!/usr/bin/env node
require("dotenv").config();
const db = require("./db");
const fs = require("fs").promises;

async function main() {
    let studs = await fs.readFile(__dirname + "/studs.csv", "utf8");
    const users = await db.query("SELECT id, username, name, surname FROM users");
    for (const user of users) {
        let rep = `${user.username};`;
        const re1 = new RegExp(";" + rep, "g");
        studs = studs.replace(re1, `;${user.id};`);
        const re2 = new RegExp(rep, "g");
        studs = studs.replace(re2, `${user.name} ${user.surname};`);
    }
    await fs.writeFile(__dirname + "/studsfix.csv", studs, "utf8");
    const json = await ssvToObj(studs);
    await fs.writeFile(__dirname + "/progs.json", JSON.stringify(json), "utf8");
    console.log("Finished!");
}

async function ssvToObj(ssv) {
    const obj = {};
    const lines = ssv.split("\n").slice(1, -1);
    for (const line of lines) {
        const [t, u, c, p] = line.split(";");
        const str = p === "t" ? `${c} ~ ${t}` : `So sieht mich ${t} in 10 Jahren: ${c}`;
        if (obj.hasOwnProperty(u)) obj[u].push(str);
        else obj[u] = [str];
    }
    return obj;
}

main()
    .then(() => process.exit())
    .catch(console.error);
