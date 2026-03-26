import https from 'https';

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
    console.log('Status Code:', res.statusCode);
    try {
      const result = JSON.parse(data);
      console.log('API Response:', JSON.stringify(result, null, 2));
    } catch (e) {
      console.log('Raw Data:', data.substring(0, 1000));
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
