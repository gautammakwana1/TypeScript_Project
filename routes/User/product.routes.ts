import express from "express";
const productRoute = express.Router();
import { getAllProduct, getProduct } from "../../controller/user/product.controller";

productRoute.get('/get-All-Product',getAllProduct);
productRoute.get('/get-Product',getProduct);

export default productRoute;