import { Router } from "express";
import User, { CannotParseDataAsUserError } from "../user/user";
import userRepository from "../user/user-repo";

const userRouter = Router();

userRouter.route('/:id')
    .get((request, response) => {
        
        response.send(`Get ${request.params.id}`);
    })
    .delete((request, response) => {
        response.send(`Delete ${request.params.id}`);
    });

userRouter.post("/new", (request, response, next) => {
    try {
        var user = User.parseFromData(request.body);
        response.status(201).json(user);
        next();
    } catch (err) {
        response.status(400);
        next(err);
    } 
});

export default userRouter;