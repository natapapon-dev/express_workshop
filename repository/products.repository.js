const productsSchema = require('../models/products.model');

async function toGetAllProduct(page, size) {
  const products = await productsSchema
    .find({})
    .skip((page - 1) * size)
    .limit(size)
    .sort({ _id: 'asc' });

  return products;
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
  const product = await productsSchema.findById(_id);
  if (product.amount < amount) {
    return false;
  }

  return true;
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
  console.log(products);
  let productUpdated;
  if (products.orders.length > 0) {
    productUpdated = await productsSchema.findByIdAndUpdate(
      { _id: _id, orders: products.orders[0]._id },
      {
        $set: { 'orders.$': order_id },
      }
    );
  } else {
    productUpdated = await productsSchema.findByIdAndUpdate(_id, {
      $set: { orders: order_id },
    });
  }

  return productUpdated;
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
};
