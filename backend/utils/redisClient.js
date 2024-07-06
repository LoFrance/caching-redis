const redis = require('redis');
console.log('Provo a connettermi a Redis...');

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: 'localhost',
    port: 6379
  }
});

client.on('connect', () => {
  console.log('Logged to Redis');
});

client.on('error', () => {
  console.log('Cannot to Redis');
});

client.connect();
module.exports = client;
