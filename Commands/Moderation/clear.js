const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js');
module.exports = {
  //define a Slash command
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription(
      'Clear a specific amount of messages from a target or channel.'
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages) // only users with manage messages permission can use this slash command
    .addIntegerOption((option) => //amount of messages we want to delete
      option
        .setName('amount')
        .setDescription('Amount of messages to clear.')
        .setRequired(true)
    )
    .addUserOption((option) =>//add The user you want delete his last amount of messages 
      option
        .setName('target')
        .setDescription('Select a target to clear their messages.')
        .setRequired(false)
    ),
  async execute(interaction) {
    const { channel, options } = interaction;
    const amountOfMessages = options.getInteger('amount');
    const target = options.getUser('target');

    const messages = await channel.messages.fetch({
      limit: amountOfMessages + 1,
    });
    const response = new EmbedBuilder().setColor(0x5fb041);
    if (target) {
      let messagesNumber = 0;
      const filteredMessages = [];
      (await messages).filter((msg) => {
        if (msg.author.id === target.id && amountOfMessages > messagesNumber) {
          //  message author (Sender) in channel matches our Target or author then
          //  add it to filteredMessages
          filteredMessages.push(msg);
          messagesNumber++;
        }
      });

      //Delete messages from this specific Channel by sending desired Messages
      //in our case we will send last amount of messages by specific user
      await channel.bulkDelete(filtered).then((messages) => {
        response.setDescription(
          `Successfully delete ${messages.size} messages from ${target}.`
        );
        interaction.reply({ embeds: [response] });
      });
    }
    //Or by sending number of Messages
    else {
      await channel.bulkDelete(amountOfMessages, true).then((messages) => {
        response.setDescription(
          `Successfully deleted ${messages.size} messages from the channel ${channel}`
        );
        interaction.reply({ embeds: [response] });
      });
    }
  },
};
