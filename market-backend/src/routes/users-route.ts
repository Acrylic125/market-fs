import { Router } from "express";
import User, { CannotParseDataAsUserError } from "../user/user";
import userRepository, { isUsernameTaken } from "../user/user-repo";
import { resolveResponseError } from "./route-utils";

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
                .json(resolveResponseError("Username Taken"));
        } else {
            response.status(201).json(user);
        }
        next();
    } catch (err) {
        if (err instanceof CannotParseDataAsUserError) {
            response.status(400)
                .json(resolveResponseError("Cannot parse data"));
        } else {
            response.status(500)
                .json(resolveResponseError("Unknown Error"));
        }
        next(err);
    } 
});

export default userRouter;