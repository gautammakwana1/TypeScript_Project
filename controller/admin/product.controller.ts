import { Request, Response } from 'express';
import ProductService from '../../services/product.services';
const productServices = new ProductService();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const addNewProduct = async (req: Request, res: Response) => {
    try {
        let product = await productServices.getProduct({productName:req.body.productName, isDelete: false });
        if (product) {
            return res.json({ message: "Product is already exist.Please try again" });
        };
        if (req.file) {
            // console.log("REQ.FILE is here => ",req.file);
            req.body.productImage = req.file.path.replace(/\s\\/g, "/");
        };
        let newProduct = await productServices.addNewProduct({ ...req.body,admin:req.admin._id });
        return res.json({ newProduct, message: "Product Succesfully Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error from Product controller' });
    }
};

export const getProduct = async (req: Request, res: Response)=>{
    try {
        let product = await productServices.getProduct({product:req.body.ProductID,isDelete: false});
        if (!product) {
            return res.json({ message: "Product is not found.. Please try again" });
        };
        return res.json({PRODUCT: product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error from Product controller' });
    }
};

export const getAllProduct = async (req: Request, res: Response)=>{
    try {
        let product = await productServices.getAllProduct({isDelete:false});
        if (!product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
        return res.json({PRODUCTS: product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error from Product controller' });
    }
};

export const getAllProductByAdmin = async (req: Request, res: Response)=>{
    try {
        // let adminID = req.admin._id;
        // console.log(adminID);
        let product = await productServices.getAll({...req.body,isDelete: false});
        if (!product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
        return res.json({PRODUCTS: product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error from Product controller' });
    }
};

export const updateProduct = async (req: Request, res: Response)=>{
    try {
        let Admin = await productServices.getProduct({admin: req.admin._id, isDelete: false});
        if(!Admin){
            return res.json({message: "You are not Authorised Admin..Plaese try again"});
        };
        let product = await productServices.getProduct({_id: req.body.ProductID, isDelete: false});
        if (!product) {
            return res.json("Product is not found..Please try again");
        };
        if (req.file) {
            req.body.productImage = req.file.path.replace(/\s\\/g, "/");
        };
        product = await productServices.updateProduct(req.body.ProductID,{...req.body});
        return res.json({PRODUCT: product, MESSAGE: "Product was updated succesfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error from Product controller' });
    }
};

export const deleteProduct = async (req: Request, res: Response)=>{
    try {
        let Admin = await productServices.getProduct({admin: req.admin._id, isDelete: false});
        if(!Admin){
            return res.json({message: "You are not Authorised Admin..Plaese try again"});
        };
        let product = await productServices.getProduct({_id: req.body.ProductID,isDelete: false});
        if(!product){
            return res.json({message: "No Such Product Found"});
        };
        product = await productServices.updateProduct(req.body.ProductID,{isDelete: true});
        return res.json({ message: "Product was deleted succesfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error from Product controller' });
    }
};
