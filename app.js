const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const BASE_PATH = 'mongodb://127.0.0.1:27017/mestodb';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64a08c746e2003ab285b35c9',
  };

  next();
});
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(BASE_PATH)
  .then(() => {
    console.log('Подключение произошло успешно. Поздравляю, пользователь');
  }).catch((err) => {
    console.error(err);
    console.log(err);
  });

app.use('/', router)



app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log('mongodb://localhost:27017/mestodb');
});
