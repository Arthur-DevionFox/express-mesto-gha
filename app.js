const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Подключение произошло успешно. Поздравляю пользователь')
  }).catch((err) => {
    console.error(err)
})