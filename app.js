const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');
const BASE_PATH = 'mongodb://127.0.0.1:27017/mestodb'

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(BASE_PATH)
  .then(() => {
    console.log('Подключение произошло успешно. Поздравляю, пользователь')
  }).catch((err) => {
    console.error(err)
    console.log(err)
})

app.use('/', require('./routes/user'))
app.use('/', require('./routes/card'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log('mongodb://localhost:27017/mestodb')
})

