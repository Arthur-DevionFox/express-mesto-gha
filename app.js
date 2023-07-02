const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const BASE_PATH = 'mongodb://127.0.0.1:27017/mestodb';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64a08c746e2003ab285b35c9',
  };

  next();
});

mongoose.connect(BASE_PATH)
  .then(() => {
    console.log('Подключение произошло успешно. Поздравляю, пользователь');
  }).catch((err) => {
    console.error(err);
    console.log(err);
  });

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log('mongodb://localhost:27017/mestodb');
});
