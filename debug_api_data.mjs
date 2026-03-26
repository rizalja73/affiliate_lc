import https from 'https';

const options = {
  method: 'GET',
  headers: {
    'x-api-key': 'lc-api-key-2026',
    'Content-Type': 'application/json'
  }
};

const req = https.get('https://lampungcerdas.com/api/produks', options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(body);
      const data = result.data.data || result.data;
      console.log(JSON.stringify(data.slice(0, 2), null, 2));
    } catch (e) {
      console.log('Error parsing:', e.message);
      console.log(body.substring(0, 500));
    }
  });
});

req.on('error', (e) => console.error(e));
