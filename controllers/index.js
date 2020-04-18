const models = require("../database/models");

const createMessage = async (req, res) => {
  try {
    const message = await models.Message.create(req.body);
    return res.status(201).json({
      message,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMessage,
};
