const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription(
      'Clear a specific amount of messages from a target or channel.'
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Amount of messages to clear.')
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('target')
            .setDescription('Select a target to clear their messages.')
        .set
    ),
};
