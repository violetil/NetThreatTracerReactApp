// server/routes/attackTypeRanking.js
const express = require('express');
const router = express.Router();
const Attack = require('../models/Attack');

router.get('/', async (req, res) => {
  try {
    const attacks = await Attack.find().sort({ count: -1 });
    res.json(attacks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
