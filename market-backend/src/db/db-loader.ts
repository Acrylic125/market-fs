import { Pool, PoolConfig } from 'pg';
import fs from 'fs';
import { prependPathWithRoot } from '../env';
import logger from '../utils/logger';
import { Dialect, Options, Sequelize } from 'sequelize';

const KEY_DB_TYPE = "db-type";
const KEY_DB_NAME = "db-name";
const KEY_DB_USERNAME = "db-username";
const KEY_DB_PASSWORD = "db-password";
const KEY_DB_HOST = "db-host";
const KEY_DB_PORT = "db-port";

function adaptToSequelizeOptions(config: DBConfig): Options {
    return {
        ...config,
        dialect: (config.type as Dialect)
    };
}

const DB_CONF = 'db-conf.json';

export interface DBConfig {
    type: string,
    username: string,
    password: string,
    host: string,
    port: number,
    database: string
}

function parseConfig(): DBConfig {
    const configRaw = fs.readFileSync(prependPathWithRoot(DB_CONF));
    const config = JSON.parse(configRaw.toString());
    return {
        type: config[KEY_DB_TYPE],
        username: config[KEY_DB_USERNAME],
        password: config[KEY_DB_PASSWORD],
        host: config[KEY_DB_HOST],
        database: config[KEY_DB_NAME],
        port: config[KEY_DB_PORT]
    };
}

export const DB_CONFIG = parseConfig();

export function createSequelize() {
    return new Sequelize(adaptToSequelizeOptions(DB_CONFIG));
}

// export default function createPool() {
//     const pool = new Pool(DB_CONFIG);
//     logger.load("Postgress Database");
//     pool.connect()
//         .then(() => 
//             logger.success("Postgress Database Loaded!"))
//         .catch((reason) => 
//             logger.error(reason));
//     return pool;
// }
