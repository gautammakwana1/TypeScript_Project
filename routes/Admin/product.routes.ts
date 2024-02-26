import express from "express";
const productRoutes = express.Router();
import { addNewProduct, deleteProduct, getAllProduct, getAllProductByAdmin, getProduct, updateProduct } from "../../controller/admin/product.controller";
import { uploadProduct } from "../../helper/imageUpload";
import { adminVerifyToken } from "../../helper/adminToken";

productRoutes.post('/add-Product',uploadProduct.single("productImage"),adminVerifyToken,addNewProduct);
productRoutes.get('/get-Product',adminVerifyToken,getProduct);
productRoutes.get('/get-All-Product',uploadProduct.any(),getAllProduct);
productRoutes.get('/get-All-Product-Admin',adminVerifyToken,uploadProduct.any(),getAllProductByAdmin);
productRoutes.put('/update-Product',adminVerifyToken,uploadProduct.single("productImage"),updateProduct);
productRoutes.delete('/delete-Product',adminVerifyToken,uploadProduct.any(),deleteProduct);

export default productRoutes