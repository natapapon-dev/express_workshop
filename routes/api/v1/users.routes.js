const userController = require('../../../controllers/users.controller');
const userRoutes = require('express').Router();
const authGuard = require('../../../middlewares/auth.guard');

userRoutes.post('/register', userController.registeredUser);
userRoutes.post('/login', userController.signIn);

module.exports = userRoutes;
