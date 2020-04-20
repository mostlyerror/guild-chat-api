const { check } = require("express-validator");
const { Op } = require("sequelize");
const moment = require("moment");
const HttpStatus = require("http-status-codes");

const { User, Message } = require("../database/models");

const paramValidations = () => {
  return [check("recipientId").isInt()];
};

const handler = async (req, res, next) => {
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

    res.status(HttpStatus.OK).json({ messages });
    next();
  } catch (err) {
    console.error(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message }) &&
      next(err);
  }
};

module.exports = {
  paramValidations,
  handler,
};
