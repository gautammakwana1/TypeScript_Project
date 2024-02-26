import express from "express";
const userRoute = express.Router();
import { deleteUser, getAllUser, getUser, loginUser, registerUser, updatePassword, updateUser } from "../../controller/user/user.controller";
import { uploadUser } from "../../helper/imageUpload";
import { userVerifyToken } from "../../helper/userToken";

userRoute.post('/register-User',uploadUser.single('profileImage'),registerUser);
userRoute.get('/login-User',uploadUser.none(),loginUser);
userRoute.get('/get-User',userVerifyToken,getUser);
userRoute.get('/get-All-User',uploadUser.none(),getAllUser);
userRoute.put('/update-User',userVerifyToken,uploadUser.single('profileImage'),updateUser);
userRoute.put('/update-Password',userVerifyToken,uploadUser.any(),updatePassword);
userRoute.delete('/delete-User',userVerifyToken,uploadUser.any(),deleteUser);

export default userRoute;