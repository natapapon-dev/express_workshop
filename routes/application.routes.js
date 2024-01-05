const express = require('express');
const apiRoutes = express.Router();

apiRoutes.use('/api', require('./api/api.routes'));

module.exports = apiRoutes;
