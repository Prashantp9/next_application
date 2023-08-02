import { Router } from "express";
import UserController from "../controllers/userController.js";
import cartController from "../controllers/cartController.js";

const cart = Router();

cart.post("/test", (req, res) => res.send("api works"));
cart.post("/create_cart", cartController.createCart);
cart.post("/delete_cart", cartController.deleteCart);
cart.post("/get_user_cart", cartController.getUserCart);

export default cart;
