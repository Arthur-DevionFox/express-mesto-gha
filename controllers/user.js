const User = require("../models/user");
const router = require('express').Router();

module.exports.getUsers = router.get('/users', (req, res) => {
  User.find({})
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
})

module.exports.getUser = router.get('/users:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
})

module.exports.createUser = router.post('users', (req, res) => {
  const { name, about, avatar } = req.body

  User.create({ name, about, avatar })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка'}))
})