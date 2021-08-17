const router = require('express').Router();
const controller = require('./controller');

router.post('/shorten', controller.shorten);

router.post('/originalUrl', controller.returnOriginalUrl);

module.exports = router;