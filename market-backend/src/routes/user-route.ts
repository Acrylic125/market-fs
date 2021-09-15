import { Router } from "express";
import User, { CannotParseDataAsUserError } from "../user/user";
import { createUser, isEmailTaken, isUsernameTaken } from "../user/user-repo";
import { jsonResponseError } from "./route-utils";
import passport from 'passport';

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
            res.status(201).json(user);
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
userRouter.post("/login", passport.authenticate('local'), (req, res, next) => {
    res.status(306)
       .redirect("/");
});

export default userRouter;