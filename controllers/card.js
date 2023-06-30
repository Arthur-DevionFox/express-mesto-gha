const Card = require('../models/card');
const router = require('express').Router();

module.exports.getUsers = router.get('/users', (req, res) => {
  Card.find({})
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
})

module.exports.getUser = router.get('/users:id', (req, res) => {
  Card.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
})

module.exports.createUser = router.post('users', (req, res) => {
  const { name, about, avatar } = req.body

  Card.create({ name, about, avatar })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка'}))
})