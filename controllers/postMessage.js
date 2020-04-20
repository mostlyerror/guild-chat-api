const { check } = require("express-validator");
const HttpStatus = require("http-status-codes");

const { User, Message } = require("../database/models");

const paramValidations = () => {
  return [
    check("senderId")
      .isInt(),
    check("recipientId")
      .isInt(),
    check("content")
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 140 })
      .trim()
      .escape(),
  ];
};

const handler = async (req, res, next) => {
  const { senderId, recipientId, content } = req.body;
  if (senderId === recipientId) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: "Sender cannot be recipient" });
  }

  const sender = await User.findOne({ where: { id: senderId } });
  if (!sender) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "Sender not found" });
  }

  const recipient = await User.findOne({ where: { id: recipientId } });
  if (!recipient) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "Recipient not found" });
  }

  try {
    const message = await Message.create({ senderId, recipientId, content });
    res.status(HttpStatus.CREATED).json({ message });
    next();
  } catch (err) {
    console.error(err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message }) &&
      next(err);
  }
};

module.exports = {
  paramValidations,
  handler,
};
