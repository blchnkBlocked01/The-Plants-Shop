const Router = require('express');
const router = new Router();
const productController = require('../../controllers/productControllers/productController');
const checkRole = require('../../middleware/checkRoleMiddleware');

router.post('/', /*checkRole('ADMIN')*/ productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.delete('/:id', /*checkRole('ADMIN')*/ productController.deleteOne);
router.patch('/:id', /*checkRole('ADMIN')*/ productController.updateOne);
// router.get('/getTypePropertyList/:id', productController.getProductPropertyList);

module.exports = router;