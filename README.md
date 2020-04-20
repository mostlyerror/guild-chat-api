# Guild Chat API

A Node + Express chat API backed by a PostgreSQL database. This would support an imaginary web-application to enable two users to send short text messages to each other, like Facebook Messages app or Google Chat.

### Requirements

1. Node version 12.12
If you have ([NVM](https://github.com/nvm-sh/nvm)) installed, node version should automatically be set upon entering the project root.
2. Local Postgres installation (if `psql` works, you should be good)


### Setup

Execute the `setup` script found at the project root.
```
$ ./setup
```

The setup script will run the following commands:
```
# install package dependencies
$ npm install

# create development and test databases:
$ createdb -U postgres guild_chat_api_development
$ createdb -U postgres guild_chat_api_test

# Migrate and seed database. Sequelize loads postgres connection strings located in `.env` file in the root.
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

Execute tests:
```
$ npm test
```

Start development server:
```
$ npm run start-dev
```

Automatically generated API documentation can be found at:
`http://localhost:3300/api/docs`


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/afde0cc6de475ad15e21)

### Notes

Some thoughts about items I'd change, given more time:

- I definitely should have containerized the whole project from the get-go, to reduce future setup friction for others. Doh!
- I'd extract a service layer out of the controller files -- The co-mingling of HTTP response handling and business logic is a little yucky. This is a pattern I've used successfully in a number of Rails projects before.
- Some parameters could be moved into environment variables, e.g., the 100 message limit. This would allow some elasticity in the performance of the service and could be connected to something like AWS Autoscaling. That'd be kinda cool, although I haven't done this in production before.
- The query pulling most recent 30 messages for a user may have some future performance implication (I'm not an expert on datetime indexing in relational databases). One way around this could be a scheduled process that marks all messages older than 30 days as `active: false` (basically a soft-delete pattern), then with the proper index on the `messages.active` column, reads would not require the `WHERE` clause, and would be faster... I think. Would have to run an experiment.
- Reactions to messages would be a fun feature to do. Perhaps also a Presence API to indicate users as being on or offline.

**Some Stuff I Learned**
1. I used a lot of new libraries for the first time. I would normally minimize the number of moving parts, but I am a bit tired of making Rails APIs and I wanted to challenge myself:
* [Sequelize](https://sequelize.org/) - ORM
* [Jest](https://jestjs.io/) - Test Framework
* [Swagger](https://swagger.io/) - Auto-Generating Documentation
* [express-validator](https://www.npmjs.com/package/express-validator) - Endpoint Parameter Validation
* [http-status-codes](https://www.npmjs.com/package/http-status-codes) - More expressive than magic numbers
2. Jest seems similar to RSpec on the surface, but it was much harder to use than I expected, probably because of my previous indoctrination in RSpec. I had trouble related to determining object equality in Javascript, which I'm not as familiar with as Ruby. It took longer than I expected to check whether an array contained an object matching a certain shape.
3. I see huge potential in Swagger for keeping documentation accurate, and low-overhead. I've also developed more curiosity about how [OpenAPI](https://swagger.io/docs/specification/about/) can be leveraged to further automate things like API input validation & sanitzation.
4. I found it very easy to produce a [race condition](https://github.com/mostlyerror/guild-chat-api/commit/bacd1b2263b988b810f71025cab4e275b95969a2) when dealing with async functions.
5. I was surprised to find that something like http-status-codes is not included by default in the Express framework.

