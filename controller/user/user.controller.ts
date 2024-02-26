import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserServices from "../../services/user.services";
const userService = new UserServices();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUser({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ message: "User already Exist...please try to login." });
        };
        let filepath:any;
        if (req.file) {
            filepath = req.file.path.replace('\\', '/');
        };
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        user = await userService.addNewUser({ ...req.body, password: hashpassword, profileImage: filepath });
        return res.json({ User: user, message: "New User Registration successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUser({ email: req.body.email, isDelete: false });
        // console.log(user);
        if (!user) {
            return res.json({ Message: "user is not found..Please try again" });
        };
        let comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.json({ Message: "Password is not matched..Please try again" });
        }
        let payLoad = { userID: user._id };
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

export const getUser = async (req: Request, res: Response) => {
    try {
        let user = req.user;
        if (!user) {
            return res.json("User is not found..Please try again");
        };
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getAllUser({ isDelete: false, isAdmin: false });
        if (!user) {
            return res.json("Users is not found..Please try again");
        };
        return res.json({ USERS: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUserById(req.user._id);
        if (!user) {
            return res.json("User is not found..Please try again");
        };
        if (req.file) {
            req.body.profileImage = req.file.path.replace('\\', '/');
        }
        user = await userService.updateUser(user._id, { ...req.body});
        return res.json({ user, message: "User Profile updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller")
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUserById(req.user._id);
        if (!user) {
            return res.json("User is not found..Please try again");
        };
        user = await userService.updateUser(req.user._id, { isDelete: true });
        return res.json("User is deleted successefully");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller");
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUserById(req.user._id);
        if (!user) {
            return res.json("User is not found..Please try again");
        };
        let Old = req.body.OldPassword;
        if (!Old) {
            return res.json("Old Password is not found");
        };
        let comparePass = await bcrypt.compare(Old, req.user.password);
        if (!comparePass) {
            return res.json("Old Password is not match");
        };
        let New = req.body.NewPassword;
        if (!New) {
            return res.json({ message: "New Password is not found" });
        };
        if (Old == New) {
            return res.json({ message: "Old & New Password is same..Please enter diffrent password" });
        };
        let confirm = req.body.ConfirmPassword;
        if (!confirm) {
            return res.json({ message: "Confirm Password is not found" });
        };
        if (New !== confirm) {
            return res.json({ message: "New & Confirm Password is not matched." });
        };
        let hashpassword = await bcrypt.hash(confirm, 10);
        user = await userService.updateUser(req.user._id, { password: hashpassword });
        return res.json({ message: "New Password is Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error from user controller")
    }
};