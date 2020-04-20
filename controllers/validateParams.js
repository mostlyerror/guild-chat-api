const { validationResult } = require('express-validator')
const HttpStatus = require('http-status-codes')

module.exports = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }

  return res
    .status(HttpStatus.UNPROCESSABLE_ENTITY)
    .json({ errors: validationErrors.array() });
};