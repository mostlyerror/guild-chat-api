const request = require("supertest");
const moment = require('moment')
const HttpStatus = require('http-status-codes')

const app = require("../server");
const { User, Message } = require("../database/models");

let finn, jake, message;
beforeAll(async () => {
  finn = await User.create({
    name: "Finn the Human",
  });

  jake = await User.create({
    name: "Jake the Dog",
  });

  message = await Message.create({
    senderId: jake.id,
    recipientId: finn.id,
    content: "Finn! Look out!",
  });
});

describe("postMessage", () => {
  it("inserts a Message", async () => {
    const messageData = {
      senderId: finn.id,
      recipientId: jake.id,
      content: "hey there all you cool cats and kittens",
    }

    const res = await request(app).post("/api/messages").send(messageData)

    expect(res.statusCode).toEqual(HttpStatus.CREATED);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatchObject(messageData)
  });

  it("sender, recipient, and content are required", async () => {
    let res = await request(app)
      .post("/api/messages")
      .send({
        senderId: finn.id,
        content: "adios amigo",
      });

    expect(res.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)

    res = await request(app)
      .post("/api/messages")
      .send({
        senderId: finn.id,
        recipientId: jake.id,
      });

    expect(res.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)
  });

  it("returns 404 when user is not found", async () => {
    let res = await request(app)
      .post("/api/messages")
      .send({
        senderId: 1000000,
        recipientId: jake.id,
        content: "adios amigo",
      });

    expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND)

    res = await request(app)
      .post("/api/messages")
      .send({
        senderId: finn.id,
        recipientId: 2000000,
        content: "adios amigo",
      });

    expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND)
  });

  it("sender cannot be recipient", async () => {
    let res = await request(app)
      .post("/api/messages")
      .send({
        senderId: finn.id,
        recipientId: finn.id,
        content: "adios amigo",
      });

    expect(res.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)
  })

  it("message content between 10 and 140 chars", async () => {
    let content = "A".repeat(9);
    let res = await request(app)
      .post("/api/messages")
      .send({
        senderId: finn.id,
        recipientId: jake.id,
        content,
      });

    expect(content.length).toEqual(9)
    expect(res.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)

    content = "B".repeat(141)
    res = await request(app)
      .post("/api/messages")
      .send({
        senderId: finn.id,
        recipientId: jake.id,
        content,
      });

    expect(content.length).toEqual(141)
    expect(res.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY)

    content = "C".repeat(140)
    res = await request(app)
      .post("/api/messages")
      .send({
        senderId: finn.id,
        recipientId: jake.id,
        content,
      });

    expect(content.length).toEqual(140)
    expect(res.statusCode).toEqual(HttpStatus.CREATED)
  });
});


describe("getMessagesForRecipient", () => {
  beforeEach(async () => {
    await Message.destroy({truncate: true})
  })

  it("responds with list of messages for a recipient", async () => {
    const message = await Message.create({
      senderId: finn.id,
      recipientId: jake.id,
      content: 'adios amigo'
    })
    const res = await request(app).get(`/api/messages/${jake.id}`)

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("messages");
    expect(res.body.messages.length).toEqual(1);
    expect(res.body.messages[0]).toMatchObject({
      id: message.id,
      senderId: message.senderId,
      recipientId: message.recipientId,
      content: message.content,
      active: message.active,
    });
  });

  it("max 100 messages", async() => {
    const messagesData = [...Array(101)].map((_item, idx) => {
      return {
        senderId: finn.id,
        recipientId: jake.id,
        content: `message ${idx}`
      };
    });

    await Message.bulkCreate(messagesData)

    const res = await request(app).get(`/api/messages/${jake.id}`)

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body).toHaveProperty("messages");
    expect(res.body.messages.length).toBeLessThan(101)
  })

  it("no messages older than 30 days", async () => {
    await Message.bulkCreate([
      {
        senderId: finn.id,
        recipientId: jake.id,
        content: 'adios amigo',
        createdAt: moment().subtract(30, 'days').toDate(),
      },
      {
        senderId: finn.id,
        recipientId: jake.id,
        content: 'adios amigo',
      },
      {
        senderId: finn.id,
        recipientId: jake.id,
        content: 'adios amigo',
        createdAt: moment().add(30, 'days').toDate(),
      },
    ])
    
    const res = await request(app).get(`/api/messages/${jake.id}`)

    expect(res.statusCode).toEqual(HttpStatus.OK);
    expect(res.body).toHaveProperty("messages");
    expect(res.body.messages.length).toEqual(2);
  })

});
