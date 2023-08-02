import { Router } from "express";
import cartController from "../controllers/cartController.js";

const cart = Router();

cart.post("/test", (req, res) => res.send("api works"));
cart.post("/create_cart", cartController.createCart);

export default cart;
