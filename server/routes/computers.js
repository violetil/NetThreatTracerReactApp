// server/routes/computers.js
const express = require('express');
const router = express.Router();
const Computer = require('../models/Computer');
const Traffic = require('../models/Traffic');
const Attack = require('../models/Attack');
const AttackPath = require('../models/AttackPath')

// 获取所有计算机
router.get('/', async (req, res) => {
  try {
    const computers = await Computer.find();
    res.json(computers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 根据ID获取单个计算机
router.get('/:id', async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);
    if (computer) {
      res.json(computer);
    } else {
      res.status(404).send('Computer not found');
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 添加新计算机
router.post('/', async (req, res) => {
  const { name, ip } = req.body;

  try {
    const existingComputer = await Computer.findOne({ ip });

    if (existingComputer) {
      res.status(400).send('Computer already exists');
      return;
    }

    const newComputer = new Computer({
      name,
      ip,
      attackTypes: []
    });

    const computer = await newComputer.save();
    res.json(computer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 更新计算机流量数据
router.post('/:id/traffic', async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);

    if (!computer) {
      res.status(404).send('Computer not found');
      return;
    }

    const newTraffic = new Traffic({ computerId: req.params.id, ...req.body });
    await newTraffic.save();

    const { prediction } = req.body;

    // 更新计算机的攻击类型
    if (prediction && !computer.attackTypes.includes(prediction)) {
      computer.attackTypes.push(prediction);
      await computer.save();
    }

    // 更新攻击类型的记录
    if (prediction && (prediction !== 'BENIGN')) {
      let attack = await Attack.findOne({ type: prediction });
      if (attack) {
        attack.count += 1;
      } else {
        attack = new Attack({ type: prediction, count: 1 });
      }
      await attack.save();
    }

    res.json(newTraffic);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 获取计算机流量数据
router.get('/:id/traffic', async (req, res) => {
  try {
    const trafficData = await Traffic.find({ computerId: req.params.id });
    res.json(trafficData);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 更新计算机攻击行为数据
router.post('/:id/attackPath', async (req, res) => {
  try {
    const attackPaths = req.body.map(item => ({ computerId: req.params.id, ...item }));
    const insertedAttackPaths = await AttackPath.insertMany(attackPaths);
    res.status(200).send(insertedAttackPaths);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 获取计算机攻击行为数据
router.get('/:id/attackPath', async (req, res) => {
  try {
    const attackPaths = await AttackPath.find({ computerId: req.params.id });
    res.status(200).send(attackPaths);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
