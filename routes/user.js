const router = require('express').Router();
const auth = require('../middlewares/auth')
const {
  getUsers, getUser, updateUser, updateAvatar, getMe
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/me', auth, getMe)
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
