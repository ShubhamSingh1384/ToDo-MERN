const express = require('express');

const  { login, signup } =  require('../controllers/authController');

const route = express.Router();

route.post('/todo/login', login);
route.post('/todo/signup', signup);


module.exports = route;