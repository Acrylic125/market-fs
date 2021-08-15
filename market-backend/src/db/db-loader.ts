import { Pool, PoolConfig } from 'pg';
import fs from 'fs';
import { prependPathWithRoot } from '../env';
import logger from '../utils/logger';

const KEY_DB_NAME = "db-name";
const KEY_DB_USERNAME = "db-username";
const KEY_DB_PASSWORD = "db-password";
const KEY_DB_HOST = "db-host";
const KEY_DB_PORT = "db-port";

function loadConfig(): PoolConfig {
    const configRaw = fs.readFileSync(prependPathWithRoot('db-conf.json'));
    const config = JSON.parse(configRaw.toString());
    return {
        user: config[KEY_DB_USERNAME],
        password: config[KEY_DB_PASSWORD],
        host: config[KEY_DB_HOST],
        port: config[KEY_DB_PORT],
        database: config[KEY_DB_NAME]
    };
}

export const DB_CONFIG = loadConfig();

export default function createPool() {
    const pool = new Pool(DB_CONFIG);
    logger.load("Postgress Database");
    pool.connect()
        .then(() => 
            logger.success("Postgress Database Loaded!"))
        .catch((reason) => 
            logger.error(reason));
    return pool;
}
