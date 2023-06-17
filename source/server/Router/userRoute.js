import {
  verifyAuthTokenMiddleware,
  verifyByCookie,
} from "../middleware/verifyAuthTokenMiddleware.js";

import { Router } from "express";
import UserController from "../controllers/userController.js";
import { authUser } from "./userAuthRoute.js";
import userService from "../service/userService.js";

const userRouter = Router();

userRouter.post("/create_user", UserController.createUserController);
userRouter.post("/auth_token_login", verifyAuthTokenMiddleware);
userRouter.post("/user_authby_cookie", verifyByCookie);
userRouter.post("/user_login", UserController.login);
// sercured user Routes
userRouter.use("/auth_user", verifyByCookie, authUser);

export default userRouter;
