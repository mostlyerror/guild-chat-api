const { Router } = require("express");

const { validateParams, getMessagesForRecipient, postMessage } = require("../controllers");

const router = Router();

router.get(
  "/messages/:recipientId",
  getMessagesForRecipient.paramValidations(),
  validateParams,
  getMessagesForRecipient.handler
);

router.post(
  "/messages",
  postMessage.paramValidations(),
  validateParams,
  postMessage.handler
);

module.exports = router;