const express = require('express');
const router = express.Router();
const { screenUser } = require('../controllers/screenUserController');

router.post('/SSA', screenUser);

module.exports = router;