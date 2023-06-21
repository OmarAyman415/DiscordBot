const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  CommandInteraction,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("pong")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    execute(interaction) {
        interaction.reply({ content: "pong", ephemeral :true }) //ephemeral means only visible for yourself
    }   
}