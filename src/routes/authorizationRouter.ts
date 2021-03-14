import express from "express";
import {LogIn, Register, ShowAll} from "../controllers/authorizationController";

const userRouter = express.Router();

userRouter.get("/", ShowAll)
userRouter.post("/login", LogIn);
userRouter.post("/register", Register);

export default userRouter;
