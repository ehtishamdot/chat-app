const { CustomAPIError } = require("./custom-error");
const { BadRequest } = require("./bad-request");
const { Unauthorized } = require("./unauthorized");

module.exports = {
  CustomAPIError,
  BadRequest,
  Unauthorized,
};
