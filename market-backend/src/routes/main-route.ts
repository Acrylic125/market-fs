import express from "express";
import userRouter from "./users-route";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { PGStore } from 'connect-pg-simple';
import { createPool } from "../db/db";

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "TempSecret",
    store: new PGStore({
        pool: createPool(),
        tableName: "sessions"
    }),
    saveUninitialized: false,
    resave: true,
    cookie: {
        secure: false, // Temp
        signed: true,
        sameSite: 'strict'
    }
}));
app.use(cookieParser())
app.use('/user', userRouter);

export default app;