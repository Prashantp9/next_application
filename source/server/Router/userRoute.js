import { Router } from "express";
import UserController from "../controllers/userController.js";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware.js";

const userRouter = Router();

// userRouter.get("/test", (req, res) => {
//   res.send("user api test");
// });
userRouter.post("/create_user", UserController.createUserController);
userRouter.post("/auth_token_login", verifyAuthTokenMiddleware, () => {
  console.log("passed through the next function");
});

export default userRouter;
