import fs from 'fs';
import { createConnection } from 'typeorm';
import { prependPathWithRoot } from '../env';

const KEY_DB_TYPE = "db-type";
const KEY_DB_NAME = "db-name";
const KEY_DB_USERNAME = "db-username";
const KEY_DB_PASSWORD = "db-password";
const KEY_DB_HOST = "db-host";
const KEY_DB_PORT = "db-port";

const DB_CONF = 'db-conf.json';

function parseConfig() {
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

const connection = await createConnection(DB_CONFIG);
export default connection;

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
