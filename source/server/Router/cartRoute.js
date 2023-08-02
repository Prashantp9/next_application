import { Router } from "express";

const cart = Router();

cart.post("/", (req, res) => res.send("api works"));
cart.post("/create_cart", (req, res) => {
  res.send("api works");
});

export { cart };
