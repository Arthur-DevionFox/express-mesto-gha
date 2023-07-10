const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth')

const someError = require('./middlewares/handleError')
const {userLogin, createUser} = require("./controllers/user");
const {validateUserAuth, validateUserCreate} = require("./utils/joiValidate");

const BASE_PATH = 'mongodb://127.0.0.1:27017/mestodb';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(BASE_PATH)
  .then(() => {
    console.log('Подключение произошло успешно. Поздравляю, пользователь');
  }).catch((err) => {
    console.error(err);
    console.log(err);
  });

app.post('/signup', validateUserAuth, createUser);
app.post('/signin', validateUserCreate, userLogin)

app.use(auth)

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такого пути не существует' });
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(someError)

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log('mongodb://localhost:27017/mestodb');
});
