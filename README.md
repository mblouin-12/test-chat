# Hello world chat

Here you will be able to launch locally a hello world chat.
You will need to launch server and client to make it works.
You will be able to join the chat channel with every other connected user, send and receive some messages.
 - You can use the advanced editor to access advanced functionalities (send images, videos, formatted text) or the simple editor to send quickly text messages.
- You can use this chat in French or in English.
- Choose your favorite theme (dark or light)


# Set up the Development Environment

### A. Check your installs
Run `node -v` and `npm -v` in a terminal.
You need :
- Node.js > 12.x.x
- npm > .x.x

Or install them
- sudo apt install nodejs
- sudo apt install npm

### B. Install [Angular CLI](https://github.com/angular/angular-cli) (angular command line interface tool)
Install CLI globally :

`sudo npm install -g @angular/cli`


# Launch server side
Previously, run `npm install` in chat-server folder

Then, to launch server:
`cd chat-server`
`npm run serve`

# Launch client side

Previously, run `npm install` in chat-client folder

Then, to launch client:
`cd chat-client`
`ng serve --open`

You can run unit tests by launching
`ng test`
