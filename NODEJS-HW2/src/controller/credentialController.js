const express = require('express');
const router = express.Router();

const credentialServices = require('../services/credentialServices')

router.post('/api/auth/register', credentialServices.register);

router.post('/api/auth/login', credentialServices.login);

module.exports = router;