import express from "express";
import userRouter from "./users-route";
var app = express();

app.use('/user', userRouter);

export default app;