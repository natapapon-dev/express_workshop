const productRepo = require('../repository/products.repository');

async function onProductCreate(req) {
  let result;
  let imagePath = '';

  if (req.file) {
    imagePath = `/images/products/${req.file.filename}`;
  } else {
    imagePath = `/images/shared/not_found.jpg`;
  }

  const payload = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productImagePath: imagePath,
    amount: req.body.amount,
    price: req.body.price,
  };

  const product = await productRepo.toCreateProduct(payload);

  result = {
    data: product,
    message: 'product create successfully',
    success: true,
    status: 201,
  };

  return result;
}

async function onProductUpdate(req) {
  let result = {};
  const { id } = req.params;
  let payload = req.body;
  const file = req.file;

  if (file) {
    const imagePath = `/images/products/${file.filename}`;
    payload = {
      ...payload,
      productImagePath: imagePath,
    };
  }

  const updatedProdcut = await productRepo.toUpdateProduct(id, payload);

  if (!updatedProdcut) {
    result = {
      data: null,
      message: `Product ID :: ${id} is not found`,
      success: false,
      status: 404,
    };

    return result;
  }

  result = {
    data: updatedProdcut,
    message: `product id :: ${id} successfully updated`,
    success: true,
    status: 200,
  };

  return result;
}

async function onDeletedProduct(req) {
  const { id } = req.params;
  let result;

  const deletedProduct = await productRepo.toDeleteProduct(id);

  if (!deletedProduct) {
    console.log('dl;lakl;dkaskd;laskd;l');
    result = {
      data: null,
      message: `Product ID :: ${id} is not found`,
      success: false,
      status: 404,
    };
    return result;
  }

  result = {
    data: null,
    message: `Successfully delete product id :: ${id}`,
    success: true,
    status: 200,
  };

  return result;
}

async function onFindProductById(req) {
  let result = {};
  const { id } = req.params;

  const products = await productRepo.toFindProductById(id);
  if (!products) {
    result = {
      data: null,
      message: `Product ID :: ${id} is not found`,
      success: false,
      status: 404,
    };

    return result;
  }

  result = {
    data: products,
    message: `success`,
    success: true,
    status: 200,
  };

  return result;
}

async function onGetAllProductByPage(req) {
  let { page, size } = req.query;

  const pageInt = parseInt(page) || 1;
  const sizeInt = parseInt(size) || 10;
  const totalItems = await productRepo.toCountAllProduct();
  const totalPages = Math.ceil(totalItems / size);

  let result = {};

  const products = await productRepo.toGetAllProduct(pageInt, sizeInt);

  if (products.lenght < 1) {
    result = {
      data: null,
      message: 'No products found',
      success: true,
      status: 200,
      currentPage: page,
      size: size,
      totalPage: totalPages,
    };
    return result;
  }

  result = {
    data: products,
    message: 'success',
    success: true,
    status: 200,
    currentPage: page,
    size: size,
    totalPage: totalPages,
  };

  return result;
}

async function onGetOrdersInProductByPage(req) {
  let result = {};
  console.log(req.query);
  console.log(req.params);
  const { page, size } = req.query;
  const { id } = req.params;
  const pageInt = parseInt(page) || 1;
  const sizeInt = parseInt(size) || 10;
  const orderCount = await productRepo.toCountAllOrderInProduct(id);
  const totalPage = Math.ceil(orderCount / sizeInt);

  const productOrders = await productRepo.toGetAllOrderinProduct(
    id,
    pageInt,
    sizeInt
  );

  result = {
    data: productOrders,
    message: `success`,
    status: 200,
    success: true,
    currentPage: pageInt,
    size: sizeInt,
    totalPage: totalPage,
  };

  return result;
}

module.exports = {
  onProductCreate,
  onProductUpdate,
  onDeletedProduct,
  onFindProductById,
  onGetAllProductByPage,
  onGetOrdersInProductByPage,
};
