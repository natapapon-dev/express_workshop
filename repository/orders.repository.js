const orderSchema = require('../models/orders.model');

async function toCreateOrder(payload) {
  const createdOrder = await payload.save();

  return createdOrder;
}

module.exports = {
  toCreateOrder,
};
