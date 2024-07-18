// server/models/AttackPath.js
const mongoose = require('mongoose');

const AttackPathSchema = new mongoose.Schema({
  computerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Computer',
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  src_ip: {
    type: String,
    required: true
  },
  event_type: {
    type: String,
    required: true
  },
  target_ip: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AttackPath', AttackPathSchema);
