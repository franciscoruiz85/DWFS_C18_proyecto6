const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
    {
        productname: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        cc: {
            type: Number
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
