const express = require('express');
const v1Routes = express.Router();
const userRoutes = require('./users.routes');
const approveRoutes = require('./approved.routes');
const productRoutes = require('./products.routes');
const orderRoutes = require('./order.routes');

v1Routes.use('/users', userRoutes);
v1Routes.use('/approve', approveRoutes);
v1Routes.use('/products', productRoutes);
v1Routes.use('/orders', orderRoutes);

module.exports = v1Routes;
