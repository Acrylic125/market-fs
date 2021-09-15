import { Router } from "express";

const userRoute = Router();
userRoute.route("/:id")
    .get((req, res) => {

    });

userRoute.post("/signup", (req, res, next) => {

});

userRoute.post("/login", (req, res, next) => {

});
