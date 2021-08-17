import { DB_CONFIG } from '../db/db-loader';
import pool from '../db/postgres';
import AsyncSafeLoadScheduler from '../scheduler/async-safeload-scheduler';
import logger from '../utils/logger';
import User from './user';

const USERS_TABLE_NAME = 'users';

async function isUserValid(username: string) {
    
}

async function isUserValidByID(id: string) {
    
}

async function getOrCreateUser() {
    
}

async function createUser() {
    
}

function verifyUsersTableExistance(): Promise<boolean> {
    return new Promise(async (resolve) => {
        const result = await pool.query(`
            SELECT EXISTS (SELECT * FROM information_schema.tables
                WHERE
                    table_catalog = '${DB_CONFIG.database}' 
                    AND table_name = '${USERS_TABLE_NAME}');`);
        resolve(result.rows[0].exists);
    });
}

async function loadTable() {
    logger.check(`Checking for ${USERS_TABLE_NAME} Table in ${DB_CONFIG.database}.`);
    if (!await verifyUsersTableExistance()) {
        logger.action(`Creating ${USERS_TABLE_NAME} Table in ${DB_CONFIG.database}.`);
        pool.query(
            `CREATE TABLE ${USERS_TABLE_NAME} (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
                username VARCHAR(64), 
                email VARCHAR(128), 
                password VARCHAR(255)
            )`)
            .then(() => logger.success(`Created ${USERS_TABLE_NAME} Table in ${DB_CONFIG.database}.`))
            .catch((err) => logger.error(err)); 
    } else {
        logger.success(`${USERS_TABLE_NAME} Table already exists in ${DB_CONFIG.database}!`);
    }
}

const userScheduler = new AsyncSafeLoadScheduler<void>("users", () => 
    loadTable());
userScheduler.load();
