import https from 'https';
import fs from 'fs';

const options = {
  method: 'GET',
  headers: {
    'x-api-key': 'lc-api-key-2026',
    'Content-Type': 'application/json'
  }
};

const username = 'rizalja73'; 
const url = `https://lampungcerdas.com/api/produks/orders?referral=${username}`;

https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      fs.writeFileSync('orders_api_debug.json', JSON.stringify(result, null, 2));
      console.log('Wrote to orders_api_debug.json');
    } catch (e) {
      console.log('Error parsing JSON');
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
