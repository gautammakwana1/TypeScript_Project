import express from "express";
const cartRoutes = express.Router();
import { addToCart, deleteCart, getAllCart, updateCart } from '../../controller/user/cart.controller';
import { userVerifyToken } from "../../helper/userToken";
import { uploadUser } from "../../helper/imageUpload";

cartRoutes.post('/add-Cart',userVerifyToken,uploadUser.any(),addToCart);
cartRoutes.get('/get-All-Cart',userVerifyToken,getAllCart);
cartRoutes.put('/update-Cart',userVerifyToken,uploadUser.any(),updateCart);
cartRoutes.delete('/delete-Cart',userVerifyToken,uploadUser.any(),deleteCart);

export default cartRoutes;