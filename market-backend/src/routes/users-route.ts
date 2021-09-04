import { Router } from "express";

const userRouter = Router();

userRouter.route('/:id')
    .get((request, response) => {
        response.status(200).send
        response.send(`Get ${request.params.id}`);
    })
    .delete((request, response) => {
        response.send(`Delete ${request.params.id}`);
    })
    .post((request, response) => {
        response.send(`Post ${request.params.id}`);
    });

export default userRouter;