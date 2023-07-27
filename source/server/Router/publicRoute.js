import { Router } from "express";
import productController from "../controllers/productController.js";

const publicRoute = Router();

publicRoute.post("/products", productController.fetchAll);
publicRoute.post("/get_product", productController.fetchProduct);

export default publicRoute;
