const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const IncorrectDataError = require('../errors/incorrect-data');
const { STATUS_OK } = require('../utils/status-constants');

const { ValidationError } = mongoose.Error;

const findById = (req, res, next, _id) => {
  User.findById(_id)
    .orFail(new NotFoundError(`Пользователь с данным id: ${_id} не найден`))
    .then((user) => res.send(user).status(STATUS_OK))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectDataError('Данные введены некорректно'))
        return
      }
      next(err)
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  findById(req, res, next, userId);

  /*User.findById(userId)
    .orFail(new IncorrectDataError('Пользователь с подобный id не существует'))
    .then((user) => res.send({message: 'пользователь найден', user}).status(STATUS_OK))
    .catch(next())*/
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Введенные данные не верны' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Введенные данные не верны' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Введенные данные не верны' }));
};
