const Card = require('../models/card');
const handleError = require('../middlewares/handleError')
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const AuthError = require("../errors/AuthError");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => {
      return new NotFoundError('Что-то пошло не так')
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card, id: req.params.cardId }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Введенные данные не верны'))
      } else {
        next(handleError)
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => {

      const owner = req.params.owner
      const user = req.params._id

      if (owner !== user) {
        return next(new AuthError('У вас нет прав на выполнение данного действия'))
      } else {
        res.status(200).send({ message: 'Карточка успешно удалена' });
      }
    })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'))
      }
      else {
        res.status(200).send({ message: 'Карточка успешно удалена' });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new ValidationError('Введенные данные не верны'))
      } else {
        next(handleError)
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'))
      } else {
        res.status(200).send({ message: 'Лайк поставлен' });
      }
    })
    .catch(() => {
      return next(new ValidationError('Произошла ошибка'))
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'))
      } else {
        res.status(200).send({ message: 'Лайк удален' });
      }
    })
    .catch(() => {
      return next(new ValidationError('произошла ошибка'));
    });
};
