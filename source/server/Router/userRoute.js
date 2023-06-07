import {
  verifyAuthTokenMiddleware,
  verifyByCookie,
} from "../middleware/verifyAuthTokenMiddleware.js";

import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRouter = Router();

// userRouter.get("/test", (req, res) => {
//   res.send("user api test");
// });
userRouter.post("/create_user", UserController.createUserController);
userRouter.post("/auth_token_login", verifyAuthTokenMiddleware, (req, res) => {
  try {
    res
      .cookie("token", req.headers.auth_token)
      .status(200)
      .send("cookie has been set");
  } catch (error) {}
});
userRouter.post("/cookie_test", verifyByCookie, (req, res) => {
  res.status(200).send("user authentication has been completed");
});

export default userRouter;
