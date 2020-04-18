# Guild Chat API

## Requirements
This is an API based on Node.js designed to fulfill the following requirements:
1. A short text message can be sent from one user (the sender) to another (the recipient).
2. Recent messages can be requested for a recipient from a specific sender - with a limit of 100 messages or all messages in last 30 days.
3. Recent messages can be requested from all senders - with a limit of 100 messages or all messages in last 30 days.

## Assumptions:
* Authorization, authentication, and user registration are all taken care of
elsewhere, ignore.
* This is a global API that can be leveraged by anyone, security is not a
  concern.


## Project Details
Built using node version 12.12

If you have NVM installed, node version should automatically be set upon
entering the project root.
*  Node Version Manager ([NVM](https://github.com/nvm-sh/nvm))

With postgres installed locally follow the steps below to create development and test databases:
```
$ createdb -U postgres guild_chat_api_development
$ createdb -U postgres guild_chat_api_test
```
