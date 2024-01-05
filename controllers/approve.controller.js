const approveService = require('../services/approved.service');

async function approved(req, res) {
  let result;
  try {
    const approved = await approveService.onApprovedUser(req);
    result = res.status(approved.status).json(approved);
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
  approved,
};
