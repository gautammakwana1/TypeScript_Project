import multer from "multer";
import { Request } from "express";

const user = multer.diskStorage({
    destination: function(req:Request,file,cb){
        cb(null,'images/user')
    },
    filename: function(req:Request,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }
});

const product = multer.diskStorage({
    destination: function(req:Request,file,cb){
        cb(null,'images/product')
    },
    filename: function(req:Request,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }
});

export const uploadUser = multer({storage: user});
export const uploadProduct = multer({storage: product});
