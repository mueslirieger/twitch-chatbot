const tmi = require("tmi.js");
const app = require('express')();
const http = require('http').Server(app);
const request = require('request');
const io = require('socket.io')(http);


// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [process.env.CHANNEL_NAME]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
io.on('connection', (socket) => {
    io.emit('connected', 'user connected');
});


// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!up") {
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!down") {
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!left") {
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!right") {
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!d20") {
    const num = rollDice(commandName);
    client.say(
      target,
      `You rolled a ${num}`
    );
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
