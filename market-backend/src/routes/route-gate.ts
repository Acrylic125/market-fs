import express from "express";
import userRouter from "./users-route";
import cookieParser from 'cookie-parser';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/user', userRouter);

export default app;