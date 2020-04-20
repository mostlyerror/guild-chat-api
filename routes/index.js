const { Router } = require("express");
const { Op } = require('sequelize')
const { check, validationResult } = require("express-validator");
const moment = require('moment')

const { User, Message } = require("../database/models");

const router = Router();


router.get(
  "/messages/:recipientId",
  [check("recipientId").isInt()],
  async (req, res) => {
    const user = await User.findOne({
      where: { id: req.params.recipientId },
    });

    try {
      let messages;
      if (!user) {
        messages = [];
      } else {
        messages = await Message.findAll({
          where: {
            recipientId: user.id,
            createdAt: {
              [Op.gte]: moment().subtract(30, "days").toDate(),
            },
          },
          limit: 100,
          raw: true,
        });
      }

      return res.status(200).json({ messages });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);


router.post(
  "/messages",
  [
    check('senderId')
      .isInt(),
    check('recipientId')
      .isInt(),
    check('content')
      .not().isEmpty()
      .isLength({min: 10, max: 140})
      .trim()
      .escape()
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(422)
        .json({ validationErrors: validationErrors.array() });
    }

    const { senderId, recipientId, content } = req.body
    if (senderId === recipientId) {
      return res.status(422).json({ message: "Sender cannot be recipient"})
    }

    const sender = await User.findOne({ where: { id: senderId }})
    if (!sender) {
      return res.status(404).json({ message: "Sender not found"})
    }

    const recipient = await User.findOne({ where: { id: recipientId }})
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found"})
    }

    const message =  await Message.create({ senderId, recipientId, content });

    return res.status(201).json({ message });
  }
);

module.exports = router;
