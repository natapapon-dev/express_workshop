const orderRepo = require('../repository/orders.repository');
const productRepo = require('../repository/products.repository');
const orderSchema = require('../models/orders.model');

async function onCreateOrder(req) {
  let result = {};
  const { id } = req.params;
  const { amount } = req.body;

  const isProductEnough = await productRepo.toCheckProductAmount(id, amount);

  if (!isProductEnough) {
    result = {
      data: null,
      message: `Product ID :: ${id} is not enough`,
      success: false,
      status: 400,
    };

    return result;
  }

  const cutStock = await productRepo.toCutStockProduct(id, amount);
  if (!cutStock) {
    result = {
      data: createdOrder,
      message: `Can't find product id :: ${id}`,
      success: false,
      status: 404,
    };

    return result;
  }

  const payload = new orderSchema({
    product: id,
    user: req.userInfo.id,
    productTotal: amount,
  });

  const createdOrder = await orderRepo.toCreateOrder(payload);

  const updatedProductOrder = await productRepo.toUpdateOrderInProduct(
    id,
    createdOrder.id
  );

  result = {
    data: createdOrder,
    message: 'successfully create order',
    success: true,
    status: 201,
  };

  return result;
}

module.exports = {
  onCreateOrder,
};
