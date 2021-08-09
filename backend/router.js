const router = require('express').Router();
const controller = require('./controller');

router.post('/shorten', controller.shorten);

module.exports = router;