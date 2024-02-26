import express from "express";
const adminRoutes = express.Router();
import { deleteAdmin, getAdmin, getAllAdmin, loginAdmin, registerAdmin, updateAdmin, updatePassword } from "../../controller/admin/admin.controller";
import { uploadUser } from "../../helper/imageUpload";
import { adminVerifyToken } from "../../helper/adminToken";

adminRoutes.post('/register-User',uploadUser.single("profileImage"),registerAdmin);
adminRoutes.get('/login-User',uploadUser.any(),loginAdmin);
adminRoutes.get('/get-User',adminVerifyToken,getAdmin);
adminRoutes.get('/get-All-User',uploadUser.any(),getAllAdmin);
adminRoutes.put('/update-User',adminVerifyToken,uploadUser.single("profileImage"),updateAdmin);
adminRoutes.put('/update-Password',adminVerifyToken,uploadUser.any(),updatePassword);
adminRoutes.delete('/delete-User',adminVerifyToken,uploadUser.any(),deleteAdmin);

export default adminRoutes;