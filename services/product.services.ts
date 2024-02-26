import Product from "../models/product.model";
import { request, response } from "express"

export default class ProductService {
    async addNewProduct(body:any) {
        try {
            return await Product.create(body);
        } catch (error) {
            console.log(error);
            return response.json({ message: "Server Error from product services" });
        }
    };

    async getProduct(body:any) {
        try {
            return await Product.findOne(body);
        } catch (error) {
            console.log(error);
            return response.json({ message: "Server Error from product services" });
        }
    };

    async getProductById(id:any) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.log(error);
            return response.json({ message: "Server Error from product services" });
        }
    };

    async getAllProduct(body:any) {
        try {
            let condition = ({ isDelete: false })
            return await Product.find({ ...condition }).select({
                admin:1,
                productName: 1,
                productPrice: 1,
                productImage: 1
            });
        } catch (error) {
            console.log(error);
            return response.json({ message: "Server Error from product services" });
        }
    };

    async getAll(body:any){
        try {
            return await Product.find(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error from product services");
        }
    }

    async updateProduct(id:string, body:any) {
        try {
            return await Product.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return response.json({ message: "Server Error from product services" });
        }
    };
};