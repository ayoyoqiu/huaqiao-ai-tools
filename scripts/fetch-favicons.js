const fs = require('fs');
const https = require('https');
const path = require('path');

// 工具列表及其favicon URL
const tools = {
  chat: {
    'doubao': 'https://doubao.com/favicon.ico',
    'kimi': 'https://kimi.moonshot.cn/favicon.ico',
    'deepseek': 'https://chat.deepseek.com/favicon.ico',
    'ernie': 'https://yiyan.baidu.com/favicon.ico',
    'spark': 'https://xinghuo.xfyun.cn/favicon.ico',
    'qianwen': 'https://tongyi.aliyun.com/favicon.ico',
    'chatglm': 'https://chatglm.cn/favicon.ico',
    'chatgpt': 'https://chat.openai.com/favicon.ico',
    'grok': 'https://x.ai/favicon.ico',
    'claude': 'https://claude.ai/favicon.ico'
  },
  image: {
    'jimmee': 'https://jimmee.com/favicon.ico',
    'wanxiang': 'https://tongyi.aliyun.com/wanxiang/favicon.ico',
    'midjourney': 'https://www.midjourney.com/favicon.ico',
    'dalle': 'https://openai.com/favicon.ico',
    'miaodraw': 'https://miaodraw.baidu.com/favicon.ico'
  },
  office: {
    'wps': 'https://www.wps.cn/favicon.ico',
    'tencent-docs': 'https://docs.qq.com/favicon.ico',
    'ai-ppt': 'https://aippt.wps.cn/favicon.ico',
    'tencent-meeting': 'https://meeting.tencent.com/favicon.ico',
    'treemind': 'https://www.treemind.cn/favicon.ico',
    'mita': 'https://metaso.cn/favicon.ico'
  },
  audio: {
    'moyin': 'https://www.moyin.com/favicon.ico',
    'suno': 'https://www.suno.ai/favicon.ico',
    'haimian': 'https://www.haimian.com/favicon.ico',
    'notebooklm': 'https://notebooklm.google/favicon.ico'
  },
  video: {
    'vidu': 'https://www.vidu.cn/favicon.ico',
    'keling': 'https://app.klingai.com/favicon.ico',
    'jimmee-video': 'https://jimmee.com/favicon.ico',
    'jianying': 'https://www.capcut.cn/favicon.ico'
  }
};

// 创建目录
const baseDir = path.join(__dirname, '..', 'public', 'images', 'logos');
Object.keys(tools).forEach(category => {
  const dir = path.join(baseDir, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 下载favicon
function downloadFavicon(url, category, name) {
  const filePath = path.join(baseDir, category, `${name}.ico`);
  
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        console.log(`Downloaded: ${name} favicon`);
        fileStream.close();
      });
    } else {
      console.log(`Failed to download: ${name} favicon (${res.statusCode})`);
    }
  }).on('error', (err) => {
    console.log(`Error downloading ${name} favicon:`, err.message);
  });
}

// 下载所有favicon
Object.entries(tools).forEach(([category, items]) => {
  Object.entries(items).forEach(([name, url]) => {
    downloadFavicon(url, category, name);
  });
});