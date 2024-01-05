const approvedController = require('../../../controllers/approve.controller');
const approvedUserRoute = require('express').Router();
const guard = require('../../../middlewares/auth.guard');

approvedUserRoute.put('/:id', guard.adminAuth, approvedController.approved);

module.exports = approvedUserRoute;
