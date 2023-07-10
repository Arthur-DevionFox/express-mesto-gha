const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUser, updateUser, updateAvatar, getMe,
} = require('../controllers/user');
const { validateUser, validateUserAvatar, validateUserID } = require('../utils/joiValidate');

router.get('/', getUsers);
router.get('/:userId', validateUserID, getUser);
router.get('/me',auth, validateUser,  getMe);
router.patch('/me', auth, validateUser, updateUser);
router.patch('/me/avatar', auth, validateUserAvatar, updateAvatar);

module.exports = router;
