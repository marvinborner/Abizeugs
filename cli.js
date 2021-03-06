#!/usr/bin/env node
require("dotenv").config();
const db = require("./db");
const fs = require("fs").promises;

const params = process.argv.slice(2);

let idx;
if ((idx = params.indexOf("-r")) > -1) {
    // DB management
    const param = params[idx + 1];
    switch (param) {
        case "all":
            db.resetAll()
                .then(() => console.info("Regenerated everything!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "motto":
            db.resetMottovote()
                .then(() => console.info("Reset motto voting!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "poll":
            db.resetPolls()
                .then(() => console.info("Reset polls!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "profile":
            db.resetProfiles()
                .then(() => console.info("Reset profiles!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "quotes":
            db.resetQuotes()
                .then(() => console.info("Reset quotes!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "secrets":
            db.resetSecrets()
                .then(() => console.info("Reset secrets!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "questions":
            db.resetQuestions()
                .then(() => console.info("Reset questions!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "char":
            db.resetCharacteristics()
                .then(() => console.info("Reset char!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        default:
            console.info("Nothing to do!");
            process.exit(0);
            break;
    }
} else if ((idx = params.indexOf("-U")) > -1) {
    // Update management (e.g.: add new poll options)
    const param = params[idx + 1];
    if (!param) process.exit(1);
    switch (param) {
        case "all":
            console.info("Updating motto votes, polls and profile!");
            db.initMottovote()
                .then(() => console.info("Updating motto votes!"))
                .then(() => db.initPolls())
                .then(() => console.info("Updating polls!"))
                .then(() => db.initProfiles())
                .then(() => console.info("Updating profile!"))
                .then(() => db.initQuestions())
                .then(() => process.exit(0))
                .catch(console.error);

            break;
        case "motto":
            db.initMottovote()
                .then(() => console.info("Updating motto votes!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "poll":
            db.initPolls()
                .then(() => console.info("Updating polls!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "profile":
            db.initProfiles()
                .then(() => console.info("Updating profile!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        case "questions":
            db.initQuestions()
                .then(() => console.info("Updating questions!"))
                .then(() => process.exit(0))
                .catch(console.error);
            break;
        default:
            console.info("Nothing to do!");
            process.exit(0);
            break;
    }
} else if ((idx = params.indexOf("--user")) > -1) {
    // User management (e.g.: Regen user pwd)
    const uid = params[idx + 1];
    if (!uid) process.exit(1);
    db.regenerateUser(uid)
        .then((pwd) => console.info(`Regenerating user with id ${uid}: ${pwd}`))
        .then(() => process.exit(0))
        .catch(console.error);
} else {
    console.log("Nothing to do!");
    process.exit(0);
}
