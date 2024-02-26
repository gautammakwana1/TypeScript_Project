import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import Userservice from "../../services/user.services";
const userService = new Userservice();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const registerAdmin = async (req: Request,res: Response) => {
    try {
        let user = await userService.getUser({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ message: "User already Exist...please try to login." });
        };
        let filepath:any;
        if (req.file) {
            req.body.profileImage = req.file.path.replace('\\', '/');
        };
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        user = await userService.addNewUser({ ...req.body, password: hashpassword, isAdmin: true });
        return res.json({ User: user, message: "New User Registration successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const getAllAdmin = async (req: Request,res: Response) =>{
    try {
        let user = await userService.getAllUser({isAdmin: true, isDelete: false});
        if (!user) {
            return res.json({ message: "User is not found.Please try again" });
        }
        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const getAdmin = async (req: Request,res: Response) =>{
    try {
        let Admin = req.admin;
        return res.json({USERS: Admin});
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const loginAdmin = async (req: Request,res: Response) =>{
    try {
        let Admin = await userService.getUser({ email: req.body.email, isAdmin: true, isDelete: false });
        if (!Admin) {
            return res.json({ message: "User is not found.Please try again" });
        };
        let comparepassword = await bcrypt.compare(req.body.password, Admin.password);
        if (!comparepassword) {
            return res.json({ message: "Password is not match.Please try again." });
        };
        let payLoad = { adminID: Admin._id };
        let secretKey: string | undefined = process.env.SECRET_KEY;
        if (payLoad && secretKey) {
            let token = jwt.sign(payLoad, secretKey);
            return res.json({ Token: token, message: "Log In User Succesfully.." });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const updateAdmin = async (req: Request,res: Response) =>{
    try {
        let Admin = await userService.getUserById(req.admin._id);
        if (!Admin) {
            return res.json("User is not found.. Please try again");
        };
        if (req.file) {
            req.body.profileImage = req.file.path.replace('\\', '/');
        };
        Admin = await userService.updateUser(req.admin._id,{...req.body});
        return res.json({ Admin, message: "User Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const deleteAdmin = async (req: Request,res: Response) =>{
    try {
        let Admin = await userService.getUserById(req.admin._id);
        if (!Admin) {
            return res.json("User is not found.. Please try again");
        };
        Admin = await userService.updateUser(req.admin._id,{isDelete: true});
        return res.json({ message: "User deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const updatePassword = async (req: Request,res: Response)=>{
    try {
        let Admin = await userService.getUserById(req.admin._id);
        if (!Admin) {
            return res.json("User is not found..Please try again");
        };
        let comparePass = await bcrypt.compare(req.body.OldPassword,req.admin.password);
        let Old = req.body.OldPassword;
        if (!comparePass) {
            return res.json("Old password is not matched");
        };
        if (!Old) {
            return res.json("Old Password is not found");
        };
        let New = req.body.NewPassword;
        if (!New) {
            return res.json("New Password is not found");
        };
        if (Old == New) {
            return res.json("Old Password & New Password is same Please enter different");
        };
        let confirm = req.body.ConfirmPassword;
        if (!confirm) {
            return res.json("Confirm Password is not found");
        };
        if (New !== confirm) {
            return res.json("New & Confirm Password is not match");
        };
        let hashpassword = await bcrypt.hash(confirm, 10);
        Admin = await userService.updateUser(req.admin._id, { password: hashpassword });
        return res.json("New Password is Updated succesfully");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};
