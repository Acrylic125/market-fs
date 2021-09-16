import { Router } from "express";
import User, { CannotParseDataAsUserError } from "../user/user";
import { createUser, findOneByEmail, findOneByUsername, isEmailTaken, isUsernameTaken } from "../user/user-repo";
import { jsonResponseError } from "./route-utils";
import passport from 'passport';
import { Strategy } from 'passport-local';
import { verifyPassword } from "../user/password";

const userRouter = Router();

// Basic methods
userRouter.route("/:id")
    .get((req, res) => {
        
    });

// Signing up
userRouter.post("/signup", async (req, res, next) => {
    try {
        // Tries to parse the given request body.
        var user = await User.parseFromRequestData(req.body);
        // Checks if the username or the email is taken.
        if (await isUsernameTaken(user.username) || await isEmailTaken(user.email)) {
            res.status(400)
                .json(jsonResponseError("Username or Email Taken"));
        } else {
            // Creates the user in the db if nothing fails.
            createUser(user);
            req.login(user, (err) => {
                console.log("err! ", err);
            });
            res.status(201);
        }
    } catch (err) {
        // Catches an error 
        // Checks if the error is a CannotParseDataAsUserError 
        // Happens when the data provided is invalid.
        if (err instanceof CannotParseDataAsUserError) {
            res.status(400)
                .json(jsonResponseError("Cannot parse data"));
        } else {
            res.status(500)
                .json(jsonResponseError("Unknown Error"));
        }
        next(err);
    } 
});

// Logging in and authentication.
passport.use(new Strategy(async (username, password, done) => {
    var user = await resolveUserFromSignInAs(username);
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

userRouter.post("/login", passport.authenticate('local'), (req, res, next) => {
    res.status(306)
       .redirect("/");
});


const EMAIL_IDENTIFIER_REGEX = /@$/gi.compile();

async function resolveUserFromSignInAs(signInAs: string) {
    return (EMAIL_IDENTIFIER_REGEX.test(signInAs)) ? findOneByEmail(signInAs) : findOneByUsername(signInAs);
}

export default userRouter;