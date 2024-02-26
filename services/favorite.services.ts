import {response} from 'express'
import favoriteModel from '../models/favorite.model';

export default class FavoriteServices{
    addToFavorite = async (body:any)=>{
        try {
            return await favoriteModel.create(body);
        } catch (error) {
            console.log(error);
            return response.json( "Server Error from Favorites Services" );
        }
    };

    getFavorite = async (body:any)=>{
        try {
            return await favoriteModel.findOne(body);
        } catch (error) {
            console.log(error);
            return response.json( "Server Error from Favorites Services" );
        }
    };

    getFavoriteById = async (id:string)=>{
        try {
            return await favoriteModel.findById(id);
        } catch (error) {
            console.log(error);
            return response.json( "Server Error from Favorites Services" );
        }
    };

    getAllFavorites = async(body:any)=> {
        try {
            let results = await favoriteModel.find(body).populate('favoriteItem').populate({
                path: 'user',
                model: 'users',
                select: 'firstName lastName email'
            });
            return results;
        } catch (error) {
            console.log(error);
            return response.json({ message: "Server Error from Favorites Services" });
        }
    };

    updateFavorite = async(id:string, body:any)=> {
        try {
            return await favoriteModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return response.json({ message: "Server Error from Favorites Services" });
        }
    };

}