import { Router } from "express";
import productController from "../controllers/productController.js";

const publicRoute = Router();

publicRoute.get("/products", productController.fetchAll);

export default publicRoute;
