import express from "express";
import userRouter from "./user-route";
import session from 'express-session';
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        signed: true
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Use routers
app.use(userRouter);

export default app;