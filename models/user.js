const mongoose = require('mongoose');
const url = require("url");
const {model} = require("mongoose");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true
  }
});

module.export = mongoose.model('user', user);
