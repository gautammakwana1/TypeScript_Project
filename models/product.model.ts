const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    productName: {
        type : String,
        unique : true,
        required : true
    },
    productImage: {
        type : String,
        required : true
    },
    productPrice: {
        type: Number,
        required : true
    },
    productBrand: {
        type : String
    },
    category: [{
        type : String
    }],
    isDelete: {
        type : Boolean,
        default : false
    }
},{
    versionKey : false,
    timestamps : true
});

const productModel = mongoose.model('products',productSchema);
export default productModel;