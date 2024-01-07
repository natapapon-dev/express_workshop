const orderController = require('../../../controllers/orders.controller');
// const auth = require('../../../middlewares/auth.guard');
const orderRoutes = require('express').Router();

orderRoutes.get('/', orderController.getAllOrder);

module.exports = orderRoutes;

// orderRoutes.post('/')
