const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    roleName: { type: String },
    roleDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

const rolesModel = mongoose.model('roles', roleSchema);

module.exports = rolesModel;
