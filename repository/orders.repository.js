const orderSchema = require('../models/orders.model');

async function toCreateOrder(payload) {
  const createdOrder = await payload.save();

  return createdOrder;
}

async function toGetAllOrder(page, size) {
  const orders = await orderSchema
    .find({})
    .populate([{ path: 'product' }, { path: 'user' }])
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: 'asc' });

  return orders;
}

async function toCountAllOrder() {
  const orderCount = await orderSchema.countDocuments().exec();

  return orderCount;
}

module.exports = {
  toCreateOrder,
  toGetAllOrder,
  toCountAllOrder,
};
