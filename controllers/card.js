const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Что-то сломалось' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Введенные данные не верны' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(() => res.status(400).send({ message: 'Такой карточки уже не существует' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(() => res.send({ message: 'Лайк поставлен' }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(() => res.send({ message: 'Лайк удален' }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};
