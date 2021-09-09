import express from "express";
import userRouter from "./users-route";
import cookieParser from 'cookie-parser';
import session from 'express-session';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "TempSecret",
    cookie: {
        secure: (process.env.NODE_ENV) ? true : false
    }
}));
app.use(cookieParser())
app.use('/user', userRouter);

export default app;