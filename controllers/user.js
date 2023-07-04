const User = require('../models/user');

const findById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с данным id: ${id} не найден` });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: `Введенный id: ${id} не является валидным` });
      } else {
        res.status(500).send({ message: 'Произошла непредвиденная ошибка' });
      }
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
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введенные данные не верны' });
      } else {
        res.status(500).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введенные данные не верны' });
      } else {
        res.status(500).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введенные данные не верны' });
      } else {
        res.status(500).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};
