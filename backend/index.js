const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://user:password@localhost:27017/freedomwall?authSource=admin')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const EXPRESS = require('express');
const MainAPI = EXPRESS();

// 🧩 Add this before your routes
MainAPI.use(cors({
  origin: '*', // allow all origins (for dev)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

MainAPI.use(require('./endpoints/account_endpoints.js').AccountsAPI);
MainAPI.use(require('./endpoints/post_endpoints.js').PostsAPI); 
MainAPI.use(EXPRESS.static('files'));
MainAPI.listen(8000, function () {
    console.log('listening on port 8000');
});