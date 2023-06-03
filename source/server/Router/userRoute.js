import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRouter = Router();

// userRouter.get("/test", (req, res) => {
//   res.send("user api test");
// });
userRouter.post("/create_user", UserController.createUserController);

export default userRouter;
