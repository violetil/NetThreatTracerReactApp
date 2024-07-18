// server/routes/hostRanking.js
const express = require('express');
const router = express.Router();
const Computer = require('../models/Computer');

router.get('/', async (req, res) => {
  try {
    const computers = await Computer.find().sort({ 'attackTypes.length': -1 });
    res.json(computers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
