module.exports = function someError(req, res, err) {
  const { statusCode = 500 } = err;
  let { message } = err;

  if (statusCode === 500) {
    message = 'Произошла непредвиденная ошибка';
  }
  res.status(statusCode).send({ message });
};
