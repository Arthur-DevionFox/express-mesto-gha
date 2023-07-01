const express = require('express');

const app = express();

module.exports.authorization = app.use((req, res, next) => {
  req.user = {
    _id: '64a08c746e2003ab285b35c9'
  }

  next()
})

// 64a08c746e2003ab285b35c9