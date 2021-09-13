import express from "express";
import userRouter from "./users-route";
import cookieParser from 'cookie-parser';
// import { PGStore } from 'connect-pg-simple';
// import { createPool } from "../db/db";
import authRouter from "./auth-route";
import { initialize, session } from "passport";

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: "TempSecret",
//     store: new PGStore({
//         pool: createPool(),
//         tableName: "sessions"
//     }),
//     saveUninitialized: false,
//     resave: true,
//     cookie: {
//         secure: false, // Temp
//         signed: true,
//         sameSite: 'strict'
//     }
// }));
app.use(cookieParser());
app.use(initialize());
app.use(session());
app.use('/user', userRouter);
app.use('/auth', authRouter);

export default app;