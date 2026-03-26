import https from 'https';

const options = {
  hostname: 'lampungcerdas.com',
  path: '/api/produks',
  method: 'GET',
  headers: {
    'x-api-key': 'lc-api-key-2026'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const parsed = JSON.parse(data);
    const item = (parsed.data.data || parsed.data)?.[0];
    console.log("Keys:", Object.keys(item));
    console.log("Sample:", item);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
