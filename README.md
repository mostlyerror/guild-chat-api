# Guild Chat API

Built using node version 12.12

If you have NVM installed, node version should automatically be set upon
entering the project root.
*  Node Version Manager ([NVM](https://github.com/nvm-sh/nvm))

### Setup

Execute the `setup` script found at the project root.
```
$ ./setup
```

The following commands will be run
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

Postman collection:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/afde0cc6de475ad15e21)
