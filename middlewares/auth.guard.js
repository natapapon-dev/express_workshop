const jwt = require('jsonwebtoken');

let userDecrypt = {};

const isAuthenticated = (req, res) => {
  const secretKey = process.env.SECRET_KEY;
  const authHeader = req.headers.authorization;
  let jwtHead = '';
  let result;

  if (authHeader != null || authHeader != undefined) {
    jwtHead = authHeader.split(' ')[1];
  } else {
    return false;
  }

  jwt.verify(jwtHead, secretKey, (err, decoded) => {
    userDecrypt = decoded;
    req.userInfo = decoded;
    if (err) {
      if (err.name === 'TokenExpiredError') {
        result = res.status(403).json({
          data: null,
          message: 'token expired',
          status: 403,
          success: false,
        });
      } else {
        result = res.status(500).json({
          data: null,
          message: err.name,
          status: 500,
          success: false,
        });
      }

      return result;
    }
  });

  return true;
};

const authorized = (req, res, next) => {
  if (isAuthenticated(req, res)) {
    next();
  } else {
    unauthorizeThrow(res);
  }
};

const adminAuth = (req, res, next) => {
  if (isAuthenticated(req, res)) {
    if (userDecrypt.role !== 'admin') {
      forbiddenRequest(res);
    } else {
      next();
    }
  } else {
    unauthorizeThrow(res);
  }
};

function unauthorizeThrow(res) {
  return res.status(401).json({
    data: null,
    message: 'Unauthorized',
    status: 401,
    success: false,
  });
}

function forbiddenRequest(res) {
  return res.status(403).json({
    data: null,
    message: 'You not have right to access this request',
    status: 403,
    success: false,
  });
}

module.exports = {
  authorized,
  adminAuth,
};
