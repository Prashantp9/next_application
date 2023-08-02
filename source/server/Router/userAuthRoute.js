import { Router } from "express";
import { cart } from "./cartRoute.js";

const authUser = Router();

authUser.post("/test", (req, res) => {
  res.send("user is Authenticated");
});
// authenticated user route
authUser.post("/cart", cart);

export { authUser };
