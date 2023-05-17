const Router = require('express');
const router = new Router();
const sizeController = require('../controllers/sizeController');

router.post('/', sizeController.create);

module.exports = router;