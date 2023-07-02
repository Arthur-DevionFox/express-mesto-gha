const User = require('../models/user');
const  NotFoundError  = require('../errors/not-found');
const  IncorrectDataError  = require('../errors/incorrect-data');

const findById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.send({message: `Пользователь с данным id: ${id} не найден`}).status(404)
      }
      else {
        res.send(user).status(200);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.send({message: `Введенный id: ${id} не является валидным`})
      }
    })
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params
  findById(req, res, next, userId);
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
