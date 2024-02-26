import Express  from "express";
const server = Express();
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import { DBUtil } from "./db/DbUtil";
dotenv.config();

import userRoute from "./routes/User/user.routes";
import adminRoutes from "./routes/Admin/admin.routes";
import productRoutes from "./routes/Admin/product.routes";
import productRoute from "./routes/User/product.routes";
import favoriteRoutes from "./routes/User/favorite.user.routes";
import cartRoutes from "./routes/User/cart.user.routes";
import orderRoutes from "./routes/User/order.user.routes";



const port: Number | undefined= Number(process.env.PORT);
const dbUrl: string | undefined = process.env.MONGO_URL;
const dbName: string | undefined = process.env.MONGO_DB_NAME;

server.use(Express.json());

server.use('/api/user',userRoute);
server.use('/api/user/product',productRoute);
server.use('/api/user/product/favorite',favoriteRoutes);
server.use('/api/user/product/cart',cartRoutes);
server.use('/api/user/product/cart/order',orderRoutes);

server.use('/api/admin',adminRoutes);
server.use('/api/admin/product',productRoutes);

// server.listen(
//     server.listen(port, ()=>{
//         if (dbUrl && dbName) {
//             DBUtil.connectToDb(dbUrl, dbName).then((dbResponse) => {
//                 console.log(dbResponse);
//             }).catch((error) => {
//                 console.error(error);
//                 process.exit(0); // stops the node js process
//             });
//         }   
//         console.log(`Server is running on http://localhost:${port}`);
//     })
// );

server.listen(port,()=>{
    mongoose.connect(dbUrl as string,{
        dbName: dbName
    })
    .then(() => {
        console.log('MongoDB connected');
        console.log(`Server is running on http://localhost:${port}`);
    })
    .catch((error) => {
        if(error){
            console.log(error);
            console.log('MongoDB not connected');
        }
    })
});
