const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Что-то сломалось' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card, id: req.params }))
    .catch(() => res.status(400).send({ message: 'Введенные данные не верны' }));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки уже не существует' })
      } else {
        next()
      }
    })
    .catch(() => res.status(400).send({ message: 'Что-то пошло не так' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(() => res.send({ message: 'Лайк поставлен' }))
    .catch(() => {
      if (!req.params.cardId) {
        res.status(404).send({ message: 'Такой карточки не существует' })
    } else {
        res.status(400).send({ message: 'Произошла ошибка' })
      }
  });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(() => res.send({ message: 'Лайк удален' }))
    .catch(() => {
      if (!req.params.cardId) {
        res.status(404).send({ message: 'Такой карточки не существует' })
      } else {
        res.status(400).send({ message: 'Произошла ошибка' })
      }
    });
};
