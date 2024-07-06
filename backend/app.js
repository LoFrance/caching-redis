const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const redisClient = require('./utils/redisClient.js');
const User = require('./models/User.js');

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('DB is connected'))
  .catch(console.log);

const corsOptions = {
  origin: ['http://localhost:5173']
};
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5005;

app.post('/users/create', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.create({ name, email });
    console.log('Dato creato...invalido la cache');
    await redisClient.del('allUsers');
    console.log('cache invalidata!');
    return res.json(user);
  } catch (e) {
    return res.send('Server error');
  }
});

app.get('/users/list', async (req, res) => {
  try {
    const cacheKey = 'allUsers';
    const cachedUsers = await redisClient.get(cacheKey);
    if (cachedUsers) {
      // Redis cache
      console.log('Dato trovato in cache');
      return res.json({ users: JSON.parse(cachedUsers) });
    }
    // MongoDB query
    const users = await User.find();
    if (users.length) {
      // Set Redis value for data
      await redisClient.set(cacheKey, JSON.stringify(users), 'EX', 3600); // Cache expire in 1h
      console.log('Dato trovato nel DB');
      return res.json({ users });
    }
    return res.json({ users: 'No Data' });
  } catch (error) {
    console.log('Errore', error);
    return res.send('Server error');
  }
});

app.listen(PORT, () => console.log('Server is listening on:', PORT));
