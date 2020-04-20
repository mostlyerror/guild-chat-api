const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router.get(
  "/messages/:recipientId",
  controllers.getMessagesForRecipient.validator,
  controllers.getMessagesForRecipient.handler
);

router.post(
  "/messages",
  controllers.postMessage.validator,
  controllers.postMessage.handler
);

module.exports = router;
