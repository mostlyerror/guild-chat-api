const { check, validationResult } = require("express-validator");
const { User, Message } = require("../database/models");

module.exports = {
  validator: [
    check("senderId").isInt(),
    check("recipientId").isInt(),
    check("content")
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 140 })
      .trim()
      .escape(),
  ],

  handler: async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(422)
        .json({ validationErrors: validationErrors.array() });
    }

    const { senderId, recipientId, content } = req.body;
    if (senderId === recipientId) {
      return res.status(422).json({ message: "Sender cannot be recipient" });
    }

    const sender = await User.findOne({ where: { id: senderId } });
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const recipient = await User.findOne({ where: { id: recipientId } });
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const message = await Message.create({ senderId, recipientId, content });

    res.status(201).json({ message });
    next();
  },
};