import { response } from 'express';
import cartModel from '../models/cart.model';

export default class CartServices {
    addToCart = async (body: any) => {
        try {
            return await cartModel.create(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error from Cart Services");
        }
    };

    getCart = async (body: any) => {
        try {
            return await cartModel.findOne(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error from Cart Services");
        }
    };

    getAllCart = async (query: any, user: any, body: any) => {
        try {
            body = { isDelete: false };
            if (query.me === 'true') {
                body.user = user._id
            }
            let results = await cartModel.find(body).populate('cartItem').populate({
                path: 'user',
                model: 'users',
                select: 'firstName lastName email'
            });
            return results;
        } catch (error) {
            console.log(error);
            return response.json("Server Error from Cart Services");
        }
    };

    updateCart = async (id: string, body: any) => {
        try {
            return await cartModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return response.json("Server Error from Cart Services");
        }
    };

    updateManyCart = async (user: any, body: any) => {
        try {
            return await cartModel.updateMany({ user: user }, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return response.json("Server Error from Cart Services");
        }
    };
};