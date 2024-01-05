const express = require('express');
const versioningRoutes = express.Router();

versioningRoutes.use('/v1', require('../api/v1/v1.routes'));

module.exports = versioningRoutes;
