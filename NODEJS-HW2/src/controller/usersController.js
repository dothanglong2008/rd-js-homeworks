const express = require('express');
const router = express.Router();

const userServices = require('../services/userServices');
const { checkToken } = require('../services/utils');


router.get('/api/users/me', checkToken, userServices.getUser);

router.delete('/api/users/me', checkToken, userServices.deleteUser);

router.patch('/api/users/me', checkToken, userServices.patchUser);

module.exports = router;