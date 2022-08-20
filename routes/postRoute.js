const router = require('express').Router()
const PostController = require('../controllers/PostController');
const upload = require('../middleware/upload');

router.get('/', PostController.index);
router.post('/store', upload.array('image'), PostController.store);
router.get('/show/:postId', PostController.show);
router.put('/update/:postId', upload.array('image'), PostController.update);
router.delete('/delete/:postId', PostController.destroy);

module.exports = router