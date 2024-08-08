const express = require('express');
const router = express.Router();
const { getScreenUser } = require('../controllers/screenUserController');

router.post('/SSA', getScreenUser);

module.exports = router;