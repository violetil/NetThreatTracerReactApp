// src/api.js
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { generateAIRecommendations } from './ai';
import NotoSansSCRegular from './fonts/NotoSansSC-Regular.ttf';

export const getGeoLocation = async (ip) => {
  const response = await fetch(`https://ipinfo.io/${ip}/geo`);
  const data = await response.json();
  return { ip, loc: data.loc }; // 返回包含 IP 和 loc 的对象
};

export const getComputers = async () => {
  const response = await fetch('http://localhost:5000/api/computers');
  return response.json();
};

export const getHostRanking = async () => {
  const response = await fetch('http://localhost:5000/api/hostRanking');
  return response.json();
};

export const getAttackTypeRanking = async () => {
  const response = await fetch('http://localhost:5000/api/attackTypeRanking');
  return response.json();
};

export const getDailyAttackData = async () => {
  const response = await fetch('http://localhost:5000/api/dailyAttackData');
  return response.json();
};

export const getComputerData = async (id) => {
  const response = await fetch('http://localhost:5000/api/computers/' + id);
  return response.json();
};

const findKeyByValue = (obj, value) => {
  for (let [key, val] of Object.entries(obj)) {
    if (val === value) {
      return key;
    }
  }
  return null;
};

export const downloadReportAsPDF = async (data) => {
  const attackTypes = {
    0: 'BENIGN',
    1: 'Bot',
    2: 'DDoS',
    3: 'DoS GoldenEye',
    4: 'DoS Hulk',
    5: 'DoS Slowhttptest',
    6: 'DoS slowloris',
    7: 'FTP-Patator',
    8: 'Heartbleed',
    9: 'Infiltration',
    10: 'PortScan',
    11: 'SSH-Patator',
    12: 'Web Attack & Brute Force',
    13: 'Web Attack & Sql Injection',
    14: 'Web Attack & XSS'
  };

  // 使用 AI 技术生成建议
  const recommendations = await generateAIRecommendations(data);

  // 准备数据
  const sanitizedData = data.map(item => ({
    type: item.prediction || '未知',
    source_ip: item.src_ip || 'N/A',
    destination_ip: item.dst_ip || 'N/A',
    details: item.details || '无详细信息',
    recommendation: recommendations[findKeyByValue(attackTypes, item.prediction)] || '无建议',
  }));

  // 创建 PDF 文档
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // 嵌入字体
  const fontBytes = await fetch(NotoSansSCRegular).then(res => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  // 添加页面
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  const fontSize = 12;

  // 标题
  page.drawText('威胁报告', {
    x: 50,
    y: height - 50,
    size: 24,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  // 表格标题
  const tableHeader = ['攻击类型', '源 IP', '目标 IP', '详细信息', '建议'];
  tableHeader.forEach((text, idx) => {
    page.drawText(text, {
      x: 50 + idx * 100,
      y: height - 80,
      size: fontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    });
  });

  // 表格内容
  sanitizedData.forEach((item, rowIdx) => {
    const yPosition = height - 100 - rowIdx * 20;
    Object.values(item).forEach((text, colIdx) => {
      page.drawText(text, {
        x: 50 + colIdx * 100,
        y: yPosition,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
      });
    });
  });

  // 下载 PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ThreatReport.pdf';
  link.click();
};