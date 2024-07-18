// src/api.js
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

export const downloadReportAsPDF = (data) => {
  const pdfMake = require('pdfmake/build/pdfmake');
  const pdfFonts = require('pdfmake/build/vfs_fonts');
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const docDefinition = {
    content: [
      { text: 'Threat Report', style: 'header' },
      {
        table: {
          body: [
            ['Type', 'Source IP', 'Destination IP', 'Details'],
            ...data.map(item => [item.type, item.source_ip, item.destination_ip, item.details]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
  };

  pdfMake.createPdf(docDefinition).download('ThreatReport.pdf');
};
