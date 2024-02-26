const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    items: [{
        cartItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        price: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalAmount: {
        type: Number
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},{
    versionKey: false,
    timestamps: true
});

const orderModel = mongoose.model('orders',orderSchema);
export default orderModel;