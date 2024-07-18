// server/models/Attack.js
const mongoose = require('mongoose');

const AttackSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Attack', AttackSchema);
