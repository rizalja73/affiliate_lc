import https from 'https';

const url = 'https://blbbsbwixeikgantefwr.supabase.co/rest/v1/affiliate_profiles?select=*&limit=1';
const key = 'sb_publishable_t2oG87jXZTbgOQjJnlTTyw_YCF9LqzK';

const options = {
  method: 'GET',
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`
  }
};

const req = https.request(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
