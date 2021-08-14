import { Pool, PoolConfig } from 'pg';
import fs from 'fs';
import { prependPathWithRoot } from '../env';

const KEY_DB_NAME = "db-name";
const KEY_DB_USERNAME = "db-username";
const KEY_DB_PASSWORD = "db-password";
const KEY_DB_HOST = "db-host";
const KEY_DB_PORT = "db-port";

// Load this synchronously for startup purposes.
function loadInDBConfig(): PoolConfig {
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

const pool = new Pool(loadInDBConfig());
export default pool;
