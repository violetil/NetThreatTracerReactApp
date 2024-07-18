// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const computersRoute = require('./routes/computers');
const hostRankingRoute = require('./routes/hostRanking');
const attackTypeRankingRoute = require('./routes/attackTypeRanking');
const dailyAttackDataRoute = require('./routes/dailyAttackData');
const aiRoutes = require('./routes/ai');

const app = express();
const port = 5000;

// 连接数据库
connectDB();

app.use(cors());
app.use(express.json());

// 提供静态文件服务
app.use('/download', express.static(path.join(__dirname, 'public')));

app.use('/api/computers', computersRoute);
app.use('/api/hostRanking', hostRankingRoute);
app.use('/api/attackTypeRanking', attackTypeRankingRoute);
app.use('/api/dailyAttackData', dailyAttackDataRoute);
app.use('/api/ai', aiRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
