const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    username: { type: String, unique: true, index: true },
    email: { type: String, unique: true, index: true },
    password: { type: String },
    isApproved: { type: Boolean },
    approvedAt: { type: Date },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('users', usersSchema);

module.exports = userModel;
