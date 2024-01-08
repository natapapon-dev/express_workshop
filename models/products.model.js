const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: { type: String },
    productDescription: { type: String },
    productImagePath: { type: String },
    amount: { type: Number },
    price: { type: Number },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const productsSchema = mongoose.model('products', productSchema);

module.exports = productsSchema;
