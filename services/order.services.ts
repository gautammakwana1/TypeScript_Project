import { response } from 'express'
import orderModel from '../models/order.model'
import cartModel from '../models/cart.model'

export default class OrderServices {
    addToOrder = async (body: any) => {
        try {
            return await orderModel.create(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error from order services");
        }
    };

    getOrder = async (body: any) => {
        try {
            return await orderModel.findOne(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error from order services");
        }
    };

    getOrderById = async (id: any) => {
        try {
            return await orderModel.findById(id);
        } catch (error) {
            console.log(error);
            return response.json("Server Error from order services");
        }
    };

    getAllOrder = async (body: any) => {
        try {
            return await orderModel.find(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error from order services");
        }
    };

    updateOrder = async (id: string, body: any) => {
        try {
            return await orderModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return response.json("Server Error from order services")
        }
    };
};