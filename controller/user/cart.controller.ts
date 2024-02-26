import {Request,Response} from 'express'
import CartServices from "../../services/cart.services";
const cartService = new CartServices();

export const addToCart = async (req:Request,res:Response)=>{
    try {
        let cart = await cartService.getCart({cartItem: req.body.cartItem, user: req.user._id, isDelete: false});
        if (cart) {
            return res.json("Cart Item is already exist");
        };
        cart = await cartService.addToCart({
            ...req.body, user: req.user._id
        });
        return res.json({CARTS:cart,MESSAGE:"New Item Added to cart succesfully"});
    } catch (error) {
        console.log(error);
        return res.json("Server Error from cart controller");
    }
};

export const getAllCart = async (req:Request,res:Response)=>{
    try {
        let cart = await cartService.getAllCart(req.query,req.user,req.body);
        if (!cart) {
            return res.json("Cart Item is not found..Please try again");
        };
        return res.json({CARTS: cart});
    } catch (error) {
        console.log(error);
        return res.json("Server Error from cart controller");
    }
};

export const updateCart = async (req:Request,res:Response)=>{
    try {
        let cart = await cartService.getCart({cartItem:req.body.cartItem,user:req.user._id,isDelete:false});
        // cart = await cartService.getCart({cartItem:req.body.cartItem,isDelete:false});
        if (!cart) {
            return res.json({message: "Cart Item is not found..Please try again"});
        };
        cart = await cartService.updateCart(cart._id,req.body);
        return res.json({CARTS: cart, MESSAGE: "Cart is updated succesfully"});
    } catch (error) {
        console.log(error);
        return res.json("Server Error from cart controller");
    }
};

export const deleteCart = async (req:Request,res:Response)=>{
    try {
        let cart = await cartService.getCart({cartItem:req.body.cartItem,user: req.user._id,isDelete: false});
        // cart = await cartService.getCart({cartItem:req.body.cartItem,isDelete:false});   
        if (!cart) {
            return res.json({message: "Cart is not found..Please try again"});
        };
        cart = await cartService.updateCart(cart._id,{isDelete: true});
        return res.json({MESSAGE: "Cart is deleted succesfully"});
    } catch (error) {
        console.log(error);
        return res.json("Server Error from cart controller");
    }
};