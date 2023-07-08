const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const someError = require('../middlewares/error')

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

module.exports.getMe = (req, res, next) => {
  const user = req.user._id
  User.findById(user)
    .then(() => {
      if (!user) {
        new Error('Пользователь с подобным id не найден')
      } else {
        res.status(201).send(user);
      }
    }).catch ((err) => {
    if (err.name === 'CastError'){
      next(new Error('Неверный формат данных в запросе'))
      return;
    }
    next(err)
  })
}

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  findById(req, res, next, userId);
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password: hash } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введенные данные не верны' });
      } else {
        res.status(500).send({ message: 'Произошла непредвиденная ошибка' });
      }
    })
};

module.exports.userLogin = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'))
      }
      return bcrypt.compare(password, user.password)
    })
    .then((matched, user) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'))
      } else {
        const token = jwt.sign({ _id: req.params._id }, 'token', {expiresIn: '7d'});
        res.status(200).send({ message: 'Все верно', token});
      }
    })
    .catch((err) => {
      res.status(401).send({message: err.message})
    })
}



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
