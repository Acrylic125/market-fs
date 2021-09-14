import express from 'express';
import session from 'express-session';
import { Strategy } from 'passport-local';
import passport from 'passport';

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

passport.use(new Strategy((username, password, done) => {
    
}))

export default app;