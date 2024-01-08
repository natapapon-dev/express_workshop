const productsSchema = require('../models/products.model');

async function toGetAllProduct(page, size) {
  const products = await productsSchema
    .find({})
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: 'asc' });

  return products;
}

async function toGetAllOrderinProduct(_id, page, size) {
  const productOrder = await productsSchema
    .findById(_id)
    .populate({ path: 'orders' })
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: 'asc' });

  return productOrder;
}

async function toFindProductById(_id) {
  const product = await productsSchema.findById(_id);
  return product;
}

async function toCreateProduct(payload) {
  const product = new productsSchema(payload);
  const productSave = await product.save();
  return productSave;
}

async function toUpdateProduct(productId, payload) {
  const product = await productsSchema.findByIdAndUpdate(
    { _id: productId },
    payload,
    { new: true }
  );

  return product;
}

async function toCountAllProduct() {
  const product = await productsSchema.countDocuments().exec();

  return product;
}

async function toCheckProductAmount(_id, amount) {
  let isEnough = false;
  let productPrice = 0;
  const product = await productsSchema.findById(_id);
  if (product.amount >= amount) {
    isEnough = true;
  }

  productPrice = product.price;

  return { isEnough, productPrice };
}

async function toDeleteProduct(_id) {
  const product = await productsSchema.findByIdAndDelete(_id);
  return product;
}

async function toCutStockProduct(_id, amount) {
  const products = await productsSchema.findById(_id);

  const updatedProduct = await productsSchema.findByIdAndUpdate(products.id, {
    $set: { amount: products.amount - amount },
  });

  return updatedProduct;
}

async function toUpdateOrderInProduct(_id, order_id) {
  const products = await productsSchema.findById(_id);

  let productUpdated;
  if (products.orders.length > 0) {
    productUpdated = await productsSchema.findOneAndUpdate(
      { _id, orders: { $exists: true } },
      { $push: { orders: order_id } },
      { new: true }
    );
  } else {
    productUpdated = await productsSchema.findByIdAndUpdate(
      _id,
      { $push: { orders: order_id } },
      { new: true }
    );
  }

  return productUpdated;
}

async function toCountAllOrderInProduct(_id) {
  const productOrders = await productsSchema.findById(_id);
  const ordersCount = productOrders.orders.length;

  return ordersCount;
}

module.exports = {
  toGetAllProduct,
  toCreateProduct,
  toUpdateProduct,
  toDeleteProduct,
  toFindProductById,
  toCountAllProduct,
  toCheckProductAmount,
  toCutStockProduct,
  toUpdateOrderInProduct,
  toGetAllOrderinProduct,
  toCountAllOrderInProduct,
};
