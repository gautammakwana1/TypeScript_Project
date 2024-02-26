import {Request,Response} from "express"
import ProductService from "../../services/product.services"
const productServices = new ProductService();

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