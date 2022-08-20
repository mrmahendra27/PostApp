const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.index);
router.post('/store', UserController.store);
router.get('/show/:postId', UserController.show);
router.put('/update/:postId', UserController.update);
router.delete('/delete/:postId', UserController.destroy);

module.exports = router