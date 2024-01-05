const userRepo = require('../repository/users.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function onRegistered(request) {
  let result;

  const { username, email, password, role } = request.body;

  const payload = {
    username,
    email,
    password: await bcrypt.hash(password, 10),
    isApproved: false,
    approvedAt: null,
    role: role,
  };

  const userRegistered = await userRepo.toRegistered(payload);

  if (userRegistered) {
    result = {
      data: {
        _id: userRegistered._id,
        username: userRegistered.username,
        email: userRegistered.email,
        role: userRegistered.role.roleName,
        createdAt: userRegistered.createdAt,
      },
      success: true,
      status: 201,
      message: 'Successfully registered Users',
    };
  }

  return result;
}

async function onSignIn(request) {
  const { identity, password } = request.body;
  let result;

  const user = await userRepo.toGetUser(identity);

  if (!user) {
    result = {
      data: request.body,
      message: `user with identity :: ${identity} is not found`,
      status: 401,
      success: false,
    };

    return result;
  }

  const isApproved = await userRepo.toCheckUserIsApproved(user._id);
  if (!isApproved) {
    result = {
      data: null,
      message: `Account is not approved`,
      status: 403,
      success: false,
    };

    return result;
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    result = {
      data: null,
      message: `wrong password`,
      status: 401,
      success: false,
    };

    return result;
  }

  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role.roleName,
  };

  const jwt_token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  result = {
    data: { jwt_token, username: user.username },
    data2: user,
    message: 'successfull sign in',
    status: 200,
    success: true,
  };

  return result;
}

module.exports = {
  onRegistered,
  onSignIn,
};
