const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const {
  validateParams,
  getMessagesForRecipient,
  postMessage,
} = require("../controllers");

const router = Router();

// --- Swagger Setup -------------------------------------------------

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Guild Chat API",
    version: "1.0.0",
    description: "API to send and receive chat messages",
    license: {
      name: "MIT",
      url: "https://choosealicense.com/licenses/mit/",
    },
    contact: {
      name: "Benjamin Poon",
      email: "benjamintpoon@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3300",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/index.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerSpecs, { explorer: true }));

// --- API Routes -----------------------------------------------------



/**
 * @swagger
 * path:
 *  /messages/:userId:
 *    get:
 *      description: Get messages for specific recipient, less than 30 days old, limit 100 total messages
 *      produces: application/json
 *      parameters:
 *        - name: userId
 *          description: Id of the user 
 *          in: path
 *          required: true
 *          type: integer
 *      responses:
 *        200:
 *          description: List of messages returned if User resource exists
 *        422:
 *          description: Invalid or missing paremeters
 *        500:
 *          description: Internal server error
 */
router.get(
  "/messages/:userId",
  getMessagesForRecipient.paramValidations(),
  validateParams,
  getMessagesForRecipient.handler
);

/**
 * @swagger
 * path:
 *  /messages:
 *    post:
 *      description: Create message
 *      produces: application/json
 *      parameters:
 *        - name: senderId
 *          description: Id of the sending user
 *          in: body
 *          required: true
 *          type: integer
 *        - name: recipientId
 *          description: Id of the receiving user
 *          in: body
 *          required: true
 *          type: integer
 *        - name: content
 *          description: Text content of the message, between 10 and 140 characters
 *          in: body
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Message was saved
 *        404:
 *          description: Sender or Recipient resource doesn't exist
 *        422:
 *          description: Invalid or missing paremeters
 *        500:
 *          description: Internal server error
 */
router.post(
  "/messages",
  postMessage.paramValidations(),
  validateParams,
  postMessage.handler
);

module.exports = router;
