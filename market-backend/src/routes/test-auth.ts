import express from 'express';
import session from 'express-session';
import { Strategy } from 'passport-local';
import passport from 'passport';
import { findOneByUsername } from '../user/user-repo';
import { verifyPassword } from '../user/password';

// https://www.youtube.com/watch?v=jXez3EsYljc
// Testing passport JS

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

app.post("/login", passport.authenticate('local'), (request, response) => {
    console.log("Login Success!");
    response.status(300).redirect("/success");
});

app.post("/success", (request, response, next) => {
    if (request.isAuthenticated()) {
        console.log("Success!!!!!");
        response.status(200).json({  message: "Yes!" })
    } else {
        console.log("Failed!!!!!");
        response.status(400).json({  message: "No!" })
    }
});

passport.use(new Strategy(async (username, password, done) => {
    var user = await findOneByUsername(username);
    try {
        return done(null,
                    (user && await verifyPassword(user!.password, password)) ? user : false);
    } catch (err) {
        return done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, (user as any).username);
});

passport.deserializeUser((id, done) => {
    done(null, { id });
});

export default app;