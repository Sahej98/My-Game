const r = require('express').Router(), c = require('../controllers/authController');
r.post('/register', c.register).post('/login', c.login);
module.exports = r;
