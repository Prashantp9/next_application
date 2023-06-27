import {
  verifyAdminByCookie,
  verifyAuthTokenMiddleware,
  verifyByCookie,
} from "../middleware/verifyAuthTokenMiddleware.js";

import { Router } from "express";
import UserController from "../controllers/userController.js";
import { adminAuth } from "./adminAuthRoute.js";
import { authUser } from "./userAuthRoute.js";

const userRouter = Router();

userRouter.post("/create_user", UserController.createUserController);
userRouter.post("/auth_token_login", verifyAuthTokenMiddleware);
userRouter.post(
  "/user_authby_cookie",
  verifyByCookie,
  UserController.userLoginByToken
);
userRouter.post("/user_login", UserController.login);
userRouter.post("/user_logout", UserController.logout);
userRouter.post("/admin_login", UserController.adminLogin);
// sercured user Routes
userRouter.use("/auth_user", verifyByCookie, authUser);
// secured admin Routes
userRouter.use("/admin", verifyAdminByCookie, adminAuth);

export default userRouter;
