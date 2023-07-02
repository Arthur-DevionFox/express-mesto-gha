const { ERROR_NOT_FOUND } = require('../utils/status-constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND;
    this.name = 'NotFound';
  }
}

module.exports = NotFound;
