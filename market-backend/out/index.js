"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = __importDefault(require("./db/postgres"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
postgres_1.default.query("CREATE TABLE accounts (id SERIAL PRIMARY KEY, username VARCHAR(255), email VARCHAR(255))", function (err, resp) {
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
