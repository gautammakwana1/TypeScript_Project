import {Request,Response} from "express"
import FavoriteServices from "../../services/favorite.services"
const favoriteService = new FavoriteServices();

// declare global {
//     namespace Express {
//         interface Request {
//             user?: any;
//         }
//     }
// }

export const addToFavorite = async (req:Request,res:Response)=>{
    try {
        let favorite = await favoriteService.getFavorite({favoriteItem:req.body.favoriteItem, user: req.user._id, isDelete: false});
        if (favorite) {
            return res.json("Product is already Exist in Favorite");
        };
        favorite = await favoriteService.addToFavorite({
            ...req.body,
            user:req.user._id,
            favoriteItem:req.body.favoriteItem
        });
        return res.json({FAVORITE: favorite, MESSAGE: "Product is added to favorite succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Server Error from Favorite controller"});
    }
};

export const getAllFavorites = async (req:Request,res:Response)=>{
    try {
        let favorite = await favoriteService.getAllFavorites({user:req.user._id, isDelete: false});
        if (!favorite) {
            return res.json({message: "Favorite Product is empty"});
        };
        return res.json({FAVORITE: favorite});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Server Error from Favorite controller"});
    }
};

export const deleteFavorite = async (req:Request,res:Response)=>{
    try {
        let favorite = await favoriteService.getFavorite({user: req.user._id ,isDelete : false});
        if (!favorite) {
            return res.json({message: "Favorite Item is not found..Please try again"});
        };
        favorite = await favoriteService.updateFavorite(
            req.body.favoriteItem,
            {
                isDelete : true
            }
        );
        return res.json("Favorite Item is deleted succesfully");
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Server Error from Favorite controller"});
    }
};