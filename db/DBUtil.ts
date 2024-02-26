import mongoose from "mongoose";

export class DBUtil{
    public static connectToDb(dbUrl: string, dbName: string): Promise<string> {
        return new Promise((resolve, reject)=>{
            mongoose.connect(dbUrl,{
                dbName: dbName
            })
            .then(() => {
                resolve('MongoDB connected')
            })
            .catch((error) => {
                if(error){
                    console.log(error);
                    reject('MongoDB not connected');
                }
            })
        });
    };
};