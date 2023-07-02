const { ERROR_INCORRECT_DATA } = require('../utils/status-constants');

class IncorrectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_DATA;
    this.name = 'IncorrectData';
  }
}

module.exports = IncorrectData;
