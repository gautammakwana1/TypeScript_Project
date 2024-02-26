import userModel from "../models/user.model";
import {response} from "express"

export default class UserServices {
    addNewUser = async (body: any) => {
        try {
            return await userModel.create(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error From user services");
        }
    };

    getUser = async (body: any) => {
        try {
            return await userModel.findOne(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error From user services");
        }
    };

    getAllUser = async (body: any) => {
        try {
            return await userModel.find(body);
        } catch (error) {
            console.log(error);
            return response.json("Server Error From user services");
        }
    };

    getUserById = async (id: string) => {
        try {
            return await userModel.findById(id);
        } catch (error) {
            console.log(error);
            return response.json("Server Error From user services");
        }
    };

    updateUser = async (id: string, body: any) => {
        try {
            return await userModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return response.json("Server Error From user services");
        }
    };
};
