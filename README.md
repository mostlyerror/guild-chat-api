# Guild Chat API

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
