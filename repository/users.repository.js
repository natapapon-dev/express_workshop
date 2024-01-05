const userSchema = require('../models/users.model');

async function toRegistered(payload) {
  const users = new userSchema(payload);
  const result = (await users.save()).populate({ path: 'role' });

  return result;
}

async function toGetUser(identity) {
  const user = await userSchema
    .findOne({
      $or: [{ username: identity }, { email: identity }],
    })
    .populate({ path: 'role' });

  return user;
}

async function toCheckUserIsApproved(userId) {
  const user = await userSchema.findById({ _id: userId });
  if (user.isApproved) {
    return true;
  }

  return false;
}

async function toApprovedUser(userId) {
  const user = await userSchema.findOneAndUpdate(
    { _id: userId, isApproved: false },
    { $set: { approvedAt: new Date(), isApproved: true } },
    { new: true }
  );

  return user;
}

module.exports = {
  toRegistered,
  toGetUser,
  toApprovedUser,
  toCheckUserIsApproved,
};
