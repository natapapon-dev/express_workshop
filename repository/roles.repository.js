const rolesSchema = require('../models/roles.model');

async function getAllRole() {
  const roles = await rolesSchema.find({});

  return roles;
}

module.exports = {
  getAllRole,
};
