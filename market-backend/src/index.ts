import pool from './db/db-loader';
import express from "express";
var app = express();

pool.query(
    `
    CREATE TABLE accounts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
        username VARCHAR(64), 
        email VARCHAR(128), 
        password VARCHAR(255)
    )
    `,
    (err, resp) => {
        //EEE
    });

// pool.query("CREATE DATABASE marketdb;", (err, resp) => {
    
// });

// import express from "express";
// var app = express();

// const PORT = process.env.PORT || 5000;

// app.use((req, resp, next) => {
//     console.log("Test!", req.url, req.protocol);
//     next();
// })

// app.get('/:id&test', (req, resp) => {
//     console.log(req.params);
// });

// app.get('/', (req, resp) => {
//     resp.json({
//         name: "ABC",
//         id: 1,
//         age: 16,
//         gender: 'F',
//         scheme: {
//             type: 'LITE',
//             cost: 1000
//         }
//     })
// });

// app.listen(PORT, () => 
//     console.log(`Running on port ${PORT}`));