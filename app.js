require('dotenv').config();
const {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  Collection,
  Partials,
} = require('discord.js');
const { AuditLogEvent, Events } = require('discord.js');
const logs = require('discord-logs');
const fetch = import('node-fetch');

const { handleLogs } = require('./Handlers/handleLogs');
const { loadEvents } = require('./Handlers/loadEvents');
const { loadCommands } = require('./Handlers/commandHandler');

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

const sadWords = ['sad', 'depressed', 'unhappy', 'angry'];

const enc = ['Cheer up !', 'Hang in there.', 'You are great', 'كسم الانسان'];

function getQuote() {
  return fetch('https://zenquotes.io/api/random')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data[0]['q'] + ' \nWritten By: ' + data[0]['a'];
    });
}


client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === '$hello') {
    getQuote().then((quote) => message.channel.send(quote));
  }

  if (sadWords.some((word) => message.content.includes(word))) {
    const encourage = enc[Math.floor(Math.random() * enc.length)];
    message.reply(encourage);
  }
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }
  message.mentions.users.forEach((user) => {
    console.log(user.id);
  });
});

client.commands = new Collection()
// console.log(process.env.TOKEN);
client.login(process.env.TOKEN).then(() => {
  handleLogs(client),
    loadEvents(client),
    loadCommands(client)
});
