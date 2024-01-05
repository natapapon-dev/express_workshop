const userServices = require('../services/users.service');

async function registeredUser(req, res) {
  let result;
  try {
    const registered = await userServices.onRegistered(req);

    result = res.status(registered.status).json(registered);
  } catch (err) {
    res.status(500).json({
      data: req.body,
      message: err.message,
      status: 500,
      success: false,
    });
  }

  return result;
}

async function signIn(req, res) {
  let result;
  try {
    const signIn = await userServices.onSignIn(req);

    result = res.status(signIn.status).json(signIn);
  } catch (error) {
    res.status(500).json({
      data: req.body,
      message: error.message,
      status: 500,
      success: false,
    });
  }

  return result;
}

module.exports = {
  registeredUser,
  signIn,
};
