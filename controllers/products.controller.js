const productsService = require('../services/products.service');

async function createdProduct(req, res) {
  let result = {};
  try {
    const createProduct = await productsService.onProductCreate(req, res);
    result = res.status(createProduct.status).json(createProduct);
  } catch (error) {
    result = res.status(500).json({
      data: req.body,
      message: error.message,
      success: false,
      status: 500,
    });
  }

  return result;
}

async function updatedProduct(req, res) {
  let result = {};
  try {
    const updatedProduct = await productsService.onProductUpdate(req);

    result = res.status(updatedProduct.status).json(updatedProduct);
  } catch (error) {
    result = res.status(500).json({
      data: req.body,
      message: error.message,
      success: false,
      status: 500,
    });
  }

  return result;
}

async function deleteProductById(req, res) {
  let result;
  try {
    const deletedProduct = await productsService.onDeletedProduct(req);

    result = res.status(deletedProduct.status).json(deletedProduct);
  } catch (error) {
    result = res.status(500).json({
      data: req.body,
      message: error.message,
      success: false,
      status: 500,
    });
  }

  return result;
}

async function findProductById(req, res) {
  let result = {};

  try {
    const findProduct = await productsService.onFindProductById(req);

    result = res.status(findProduct.status).json(findProduct);
  } catch (error) {
    result = res.status(500).json({
      data: req.body,
      message: error.message,
      success: false,
      status: 500,
    });
  }

  return result;
}

async function getAllProductPagination(req, res) {
  let result = {};
  try {
    const products = await productsService.onGetAllProductByPage(req);

    result = res.status(products.status).json(products);
  } catch (error) {
    result = res.status(500).json({
      data: req.body,
      message: error.message,
      success: false,
      status: 500,
    });
  }

  return result;
}

async function getAllOrderInProductPagination(req, res) {
  let result = {};
  try {
    const productOrders = await productsService.onGetOrdersInProductByPage(req);

    result = res.status(productOrders.status).json(productOrders);
  } catch (error) {
    result = res.status(500).json({
      data: req.body,
      message: error.message,
      sucess: false,
      status: 500,
    });
  }
}

module.exports = {
  createdProduct,
  updatedProduct,
  deleteProductById,
  findProductById,
  getAllProductPagination,
  getAllOrderInProductPagination,
};
