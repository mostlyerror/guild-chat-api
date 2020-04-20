const { check, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const moment = require("moment");
const HttpStatus = require("http-status-codes");

const { User, Message } = require("../database/models");

module.exports = {
  validator: [check("recipientId").isInt()],

  handler: async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ validationErrors: validationErrors.array() });
    }

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
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: err.message }) && next(err);
    }
  },
};
