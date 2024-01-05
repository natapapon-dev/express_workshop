const productController = require('../../../controllers/products.controller');
const orderController = require('../../../controllers/orders.controller');
const productRoutes = require('express').Router();

const authGuard = require('../../../middlewares/auth.guard');
const upload = require('../../../middlewares/multer.upload');

productRoutes.post(
  '/',
  authGuard.adminAuth,
  upload.single('productImage'),
  productController.createdProduct
);
productRoutes.put(
  '/:id',
  authGuard.adminAuth,
  upload.single('productImage'),
  productController.updatedProduct
);

productRoutes.get('/:id', productController.findProductById);
productRoutes.delete('/:id', productController.deleteProductById);
productRoutes.get('/', productController.getAllProductPagination);

productRoutes.post(
  '/:id/orders',
  authGuard.authorized,
  orderController.createdOrder
);

module.exports = productRoutes;
