"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var fs_1 = __importDefault(require("fs"));
var env_1 = require("../env");
var chalk_1 = __importDefault(require("chalk"));
var KEY_DB_NAME = "db-name";
var KEY_DB_USERNAME = "db-username";
var KEY_DB_PASSWORD = "db-password";
var KEY_DB_HOST = "db-host";
var KEY_DB_PORT = "db-port";
// Load this synchronously for startup purposes.
function loadInDBConfig() {
    var configRaw = fs_1.default.readFileSync(env_1.prependPathWithRoot('db-conf.json'));
    var config = JSON.parse(configRaw.toString());
    return {
        user: config[KEY_DB_USERNAME],
        password: config[KEY_DB_PASSWORD],
        host: config[KEY_DB_HOST],
        port: config[KEY_DB_PORT],
        database: config[KEY_DB_NAME]
    };
}
var pool = new pg_1.Pool(loadInDBConfig());
console.log(chalk_1.default.blueBright("LOADING") + " Postgres Database...");
try {
    pool.connect();
    console.log(chalk_1.default.greenBright("DONE") + " Postgres Loaded!");
}
catch (error) {
    console.error(error);
    console.log(chalk_1.default.redBright("FAILED") + " Postgres Failed to load!");
}
exports.default = pool;
