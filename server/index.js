const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Router = require('./Routes/index');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', Router);

app.get('/', (req, res) => {
  res.send('Server is running');
})
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
