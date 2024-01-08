const orderRepo = require('../repository/orders.repository');
const productRepo = require('../repository/products.repository');
const orderSchema = require('../models/orders.model');

async function onCreateOrder(req) {
  let result = {};
  const { id } = req.params;
  const { amount } = req.body;

  const { isProductEnough, productPrice } =
    await productRepo.toCheckProductAmount(id, amount);

  if (!isProductEnough) {
    result = {
      data: null,
      message: `Product ID :: ${id} is not enough`,
      success: false,
      status: 400,
    };

    return result;
  }

  const payload = new orderSchema({
    product: id,
    user: req.userInfo.id,
    productTotal: amount,
    priceTotal: amount * productPrice,
  });

  const createdOrder = await orderRepo.toCreateOrder(payload);

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

  await productRepo.toUpdateOrderInProduct(id, createdOrder.id);

  result = {
    data: createdOrder,
    message: 'successfully create order',
    success: true,
    status: 201,
  };

  return result;
}

async function onGetAllProductPagination(req) {
  let result = {};
  const { page, size } = req.query;
  const pageInt = parseInt(page) || 1;
  const sizeInt = parseInt(size) || 10;
  const totalItems = await orderRepo.toCountAllOrder();
  const totalPages = Math.ceil(totalItems / size);

  const orders = await orderRepo.toGetAllOrder(pageInt, sizeInt);

  result = {
    data: orders,
    message: 'success',
    totalPage: totalPages,
    currentPage: pageInt,
    pageSize: sizeInt,
    success: true,
    status: 200,
  };
  return result;
}

module.exports = {
  onCreateOrder,
  onGetAllProductPagination,
};
