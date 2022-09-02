const { CustomAPIError } = require("./custom-error");
const { StatusCodes } = require("http-status-codes");
class Unauthorized extends CustomAPIError {
  constructor(message) {
    console.log(message);
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = { Unauthorized };
