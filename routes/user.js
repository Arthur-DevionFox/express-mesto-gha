const router = require('express').Router();
const auth = require('../middlewares/auth')
const {
  getUsers, getUser, createUser, updateUser, updateAvatar, userLogin, getMe
} = require('../controllers/user');

router.post('/signin', userLogin);
router.post('/signup', createUser);
router.get('/', auth, getUsers);
router.get('/:userId', getUser);
router.get('/me', auth, getMe)
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
