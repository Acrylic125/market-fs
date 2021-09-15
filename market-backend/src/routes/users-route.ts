import { Router } from "express";
import User, { CannotParseDataAsUserError } from "../user/user";
import userRepository, { createUser, findOneByEmail, findOneByUsername, isEmailTaken, isUsernameTaken } from "../user/user-repo";
import { jsonResponseError } from "./route-utils";
import { verifyPassword } from '../user/password';
import { authenticate } from 'passport';
import passportLocal from 'passport-local';

const userRouter = Router();

userRouter.route('/:id')
    .get((request, response) => {
        
        response.send(`Get ${request.params.id}`);
    })
    .delete((request, response) => {
        response.send(`Delete ${request.params.id}`);
    });

userRouter.post("/new", async (request, response, next) => {
    try {
        var user = await User.parseFromRequestData(request.body);
        if (await isUsernameTaken(user.username) || await isEmailTaken(user.email)) {
            response.status(400)
                .json(jsonResponseError("Username or Email Taken"));
        } else {
        
            createUser(user);
            response.status(201).json(user);
        }
    } catch (err) {
        if (err instanceof CannotParseDataAsUserError) {
            response.status(400)
                .json(jsonResponseError("Cannot parse data"));
        } else {
            response.status(500)
                .json(jsonResponseError("Unknown Error"));
        }
        next(err);
    } 
});

const EMAIL_IDENTIFIER_REGEX = /@$/gi.compile();

async function resolveUserFromSignInAs(signInAs: string) {
    return (EMAIL_IDENTIFIER_REGEX.test(signInAs)) ? findOneByEmail(signInAs) : findOneByUsername(signInAs);
}

userRouter.get("/login", async (request, response) => {
    var { signInAs, password } = request.body;
    if (!(signInAs && password)) {
        response.status(400)
            .json(jsonResponseError("No username/email or password provided"));
        return;
    } 
    var user = await resolveUserFromSignInAs(signInAs);
    if (!user) {
        response.status(400)
            .json(jsonResponseError("Invalid account"));
        return;
    } 
    if (!verifyPassword(password, user.password)) {
        response.status(400)
            .json(jsonResponseError("Invalid password"));
        return;
    }
    response.status(200).json(user);
});

export default userRouter;