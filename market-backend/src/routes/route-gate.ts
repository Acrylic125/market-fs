import express from "express";
import userRouter from "./users-route";
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);

export default app;