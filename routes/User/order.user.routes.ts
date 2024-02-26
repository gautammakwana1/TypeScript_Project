import express from "express";
const orderRoutes = express.Router();
import { addOrder, deleteOrder, getAllOrder, getOrder } from '../../controller/user/order.controller';
import { userVerifyToken } from "../../helper/userToken";
import { uploadUser } from "../../helper/imageUpload";

orderRoutes.post('/add-Order',userVerifyToken,addOrder);
orderRoutes.get('/get-Order',userVerifyToken,uploadUser.any(),getOrder);
orderRoutes.get('/get-All-Order',userVerifyToken,getAllOrder);
orderRoutes.delete('/delete-Order',userVerifyToken,uploadUser.any(),deleteOrder);

export default orderRoutes;