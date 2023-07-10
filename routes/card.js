const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const auth = require('../middlewares/auth');
const { validateCardID, validateCard } = require('../utils/joiValidate');

router.get('/', auth, getCards);
router.post('/', auth, validateCard, createCard);
router.delete('/:cardId', validateCardID, auth, deleteCard);
router.put('/:cardId/likes', validateCardID, auth, likeCard);
router.delete('/:cardId/likes', validateCardID, auth, dislikeCard);

module.exports = router;
