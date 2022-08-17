const router = require('express').Router()
const PostController = require('../controllers/PostController')

router.get('/', PostController.index);
router.post('/store', PostController.store);
router.get('/show/:postId', PostController.show);
router.put('/update/:postId', PostController.update);
router.delete('/delete/:postId', PostController.destroy);

module.exports = router