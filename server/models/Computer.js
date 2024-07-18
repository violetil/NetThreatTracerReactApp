// server/models/Computer.js
const mongoose = require('mongoose');

const ComputerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  attackTypes: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Computer', ComputerSchema);
