const orderService = require('../services/orders.service');

async function createdOrder(req, res) {
  let result = {};
  try {
    const createdOrder = await orderService.onCreateOrder(req);

    result = res.status(createdOrder.status).json(createdOrder);
  } catch (error) {
    result = res.status(500).json({
      data: req.data,
      message: error.message,
      success: false,
      status: 500,
    });
  }

  return result;
}

async function getAllOrder(req, res) {
  let result = {};
  try {
    const orders = await orderService.onGetAllProductPagination(req);

    result = res.status(orders.status).json(orders);
  } catch (error) {
    result = res.status(500).json({
      data: req.data,
      message: error.message,
      success: false,
      status: 500,
    });
  }

  return result;
}

module.exports = { createdOrder, getAllOrder };
