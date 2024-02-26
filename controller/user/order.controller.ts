import { Request, Response } from "express";
import OrderServices from '../../services/order.services';
const orderService = new OrderServices();
import CartServices from "../../services/cart.services";
const cartService = new CartServices();

export const addOrder = async (req:Request,res:Response) => {
    try {
        let cart = await cartService.getAllCart(req.query,req.user,req.body);
        if (!cart) {
            return res.json({message: "Cart is not found..Please try again"});
        };
        let orderItem = cart.map((item:any)=>({
            cartItem: item.cartItem._id,
            price: item.cartItem.productPrice,
            quantity: item.quantity
        }));
        let totalPrice = orderItem.reduce((total:number,item:any)=>(total+= (item.quantity * item.price)),0);
        let newOrder = {
            user: req.user._id,
            items: orderItem,
            totalAmount:totalPrice 
        };
        let order = await orderService.addToOrder(newOrder);
        await cartService.updateManyCart(req.user._id,{isDelete: true});
        return res.json({order, message: "Order Succesfully Done"});
    } catch (error) {
        console.log(error);
        return res.json("Server Error from order user controller")
    }
};

export const getOrder = async (req:Request,res:Response)=>{
    try {
        let order = await orderService.getOrder({_id:req.body.orderID,user:req.user._id,isDelete: false});
        if (!order) {
            return res.json({message: "Order is not found from this USER"});
        };
        return res.json({order});
    } catch (error) {
        console.log(error);
        return res.json("Server Error from order user controller")
    }
};

export const getAllOrder = async (req:Request,res:Response)=>{
    try {
        let order = await orderService.getAllOrder({user:req.user._id,isDelete:false});
        if (!order) {
            return res.json({message: "Order is not found..Please try again"});
        };
        return res.json({ORDERS: order});
    } catch (error) {
        console.log(error);
        return res.json("Server Error from order user controller")
    }
};

export const deleteOrder = async (req:Request,res:Response)=>{
    try {
        let order = await orderService.getOrder({_id:req.body.orderID,user:req.user._id,isDelete: false})
        if (!order) {
            return res.json({ message: "Order is not found..." });
        };
        order = await orderService.updateOrder(req.body.orderID,{isDelete: true});
        return res.json({ MESSAGE: "Order is Deleted Sucessfuly" });
    } catch (error) {
        console.log(error);
        return res.json("Server Error from order user controller");
    }
};