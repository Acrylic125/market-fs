import { Router } from "express";
import userRepository from "../user/user-repo";

const userRouter = Router();

userRouter.route('/:id')
    .get((request, response) => {
        
        response.send(`Get ${request.params.id}`);
    })
    .delete((request, response) => {
        response.send(`Delete ${request.params.id}`);
    })
    .post((request, response) => {
        console.log(request.body);
        response.send(`Post ${request.params.id} ${JSON.stringify(request.body, null, 4)}`);
    });

export default userRouter;