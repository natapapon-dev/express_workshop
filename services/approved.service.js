const userRepo = require('../repository/users.repository');

async function onApprovedUser(req) {
  const { id } = req.params;

  let result;

  const isApproved = await userRepo.toCheckUserIsApproved(id);

  if (isApproved) {
    result = {
      data: null,
      status: 400,
      message: `User with id :: ${id} is already approved`,
      success: false,
    };

    return result;
  }

  const approved = await userRepo.toApprovedUser(id);
  if (!approved) {
    result = {
      data: null,
      message: `Can't find user with id :: ${id}`,
      status: 404,
      success: true,
    };

    return result;
  }

  result = {
    data: {
      _id: approved._id,
      username: approved.username,
      email: approved.email,
      approvedAt: approved.approvedAt,
      isApproved: approved.isApproved,
    },
    message: `User ID :: ${id} is Approved!`,
    status: 200,
    success: true,
  };

  return result;
}

module.exports = {
  onApprovedUser,
};
