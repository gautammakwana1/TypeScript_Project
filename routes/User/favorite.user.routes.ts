import express from "express";
const favoriteRoutes = express.Router();
import { addToFavorite, deleteFavorite, getAllFavorites } from "../../controller/user/favorite.controller";
import { userVerifyToken } from "../../helper/userToken";
import { uploadUser } from "../../helper/imageUpload";

favoriteRoutes.post('/add-Favorite',userVerifyToken,uploadUser.any(),addToFavorite);
favoriteRoutes.get('/get-All-Favorite',userVerifyToken,uploadUser.any(),getAllFavorites);
favoriteRoutes.delete('/delete-Favorite',userVerifyToken,uploadUser.any(),deleteFavorite);

export default favoriteRoutes;