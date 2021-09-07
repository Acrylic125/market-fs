import { Router } from "express";
import User, { CannotParseDataAsUserError } from "../user/user";
import userRepository, { createUser, isUsernameTaken } from "../user/user-repo";
import { jsonResponseError } from "./route-utils";
import { verifyPassword } from '../user/password';

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
        var user = User.parseFromData(request.body);
        if (await isUsernameTaken(user.username)) {
            response.status(400)
                .json(jsonResponseError("Username Taken"));
        } else {
            createUser(user);
            response.status(201).json(user);
        }
        next();
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

userRouter.get("/login", (request, response) => {
    var { signInAs, password } = request.body;
    if (!(signInAs && password)) {
        response.status(400)
            .json(jsonResponseError("No username/email or password provided"));
        return;
    } 
    if (!verifyPassword(password, )) {
        response.status(400)
            .json(jsonResponseError("No username or email provided"));
        return;
    }
});

export default userRouter;