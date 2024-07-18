export const generateAIRecommendations = async (data) => {
  const attackTypes = {
    0: '良性',
    1: '僵尸网络',
    2: 'DDoS',
    3: 'DoS GoldenEye',
    4: 'DoS Hulk',
    5: 'DoS Slowhttptest',
    6: 'DoS slowloris',
    7: 'FTP-Patator',
    8: '心脏出血',
    9: '渗透',
    10: '端口扫描',
    11: 'SSH-Patator',
    12: 'Web 攻击 & 暴力破解',
    13: 'Web 攻击 & SQL 注入',
    14: 'Web 攻击 & XSS',
  };

  const recommendations = {};

  for (let key in attackTypes) {
    let recommendation = '';
    switch (parseInt(key)) {
      case 0:
        recommendation = '此流量为良性，无需采取措施。';
        break;
      case 1:
        recommendation = '建议检测并清理僵尸网络感染的设备，升级安全软件。';
        break;
      case 2:
        recommendation = '建议部署DDoS防护系统，监控异常流量。';
        break;
      case 3:
        recommendation = '建议加强网络安全设备配置，防范DoS攻击。';
        break;
      case 4:
        recommendation = '建议部署入侵检测系统，监控并阻止DoS攻击。';
        break;
      case 5:
        recommendation = '建议使用防火墙规则限制异常HTTP流量。';
        break;
      case 6:
        recommendation = '建议配置服务器以抵御slowloris攻击。';
        break;
      case 7:
        recommendation = '建议加强FTP服务的安全配置，防范暴力破解。';
        break;
      case 8:
        recommendation = '建议立即修补心脏出血漏洞，升级OpenSSL版本。';
        break;
      case 9:
        recommendation = '建议加强网络监控，及时发现并阻止渗透攻击。';
        break;
      case 10:
        recommendation = '建议使用防火墙阻止异常端口扫描流量。';
        break;
      case 11:
        recommendation = '建议加强SSH服务的安全配置，防范暴力破解。';
        break;
      case 12:
        recommendation = '建议部署Web应用防火墙，防范暴力破解攻击。';
        break;
      case 13:
        recommendation = '建议加强SQL注入防护，使用参数化查询。';
        break;
      case 14:
        recommendation = '建议使用内容安全策略(CSP)防御XSS攻击。';
        break;
      default:
        recommendation = '无特定建议。';
    }
    recommendations[key] = recommendation;
  }

  return recommendations;
};