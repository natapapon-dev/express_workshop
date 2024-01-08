const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    productTotal: {
      type: Number,
    },
    priceTotal: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ordersModel = mongoose.model('orders', orderSchema);

module.exports = ordersModel;
