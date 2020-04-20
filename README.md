# Guild Chat API

Built using node version 12.12

If you have NVM installed, node version should automatically be set upon
entering the project root.
*  Node Version Manager ([NVM](https://github.com/nvm-sh/nvm))

### Setup

Run the following commands from the project root.

Install package dependencies
```
$ npm install
```

With local postgres installation, create development and test databases:
```
$ createdb -U postgres guild_chat_api_development
$ createdb -U postgres guild_chat_api_test
```

Migrate and seed database. Sequelize loads postgres connection strings located in `.env` file in the root.
```
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

Execute tests:
```
$ npm test
```

Start the development server:
```
$ npm run start-dev
```

Automatically generated API documentation can be found at:
`http://localhost:3300/api/docs`

Postman collection:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/afde0cc6de475ad15e21)
