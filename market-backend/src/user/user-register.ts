import pool from '../db/db-loader';
import logger from '../utils/logger';

async function generateTable() {
    pool.query(
        `CREATE TABLE accounts (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
            username VARCHAR(64), 
            email VARCHAR(128), 
            password VARCHAR(255)
        )`,
        (err) => {
            if (err) 
                logger.error(err);
        }); 
}

generateTable();
console.log("T");