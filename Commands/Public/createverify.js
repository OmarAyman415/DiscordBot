const {
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  //define a Slash command
  data: new SlashCommandBuilder()
    .setName('createverify')
    .setDescription('Set Your verification channel')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Send verification embed in this channel')
        .setRequired(true)
  ).setDefaultMemberPermissions(PermissionFlagsBits.Administrator),// only Admins can use this slash command
  async execute(interaction) {
    // channel which the user send as a parameter
    const channel = interaction.options.getChannel('channel')

    const verifyEmbed = new EmbedBuilder()
      .setTitle("Verification")
      .setDescription("click the button to verify your account and get access to the channels.")
      .setColor(0x5fb041)
    
    
    let sendChannel = channel.send({
      embeds: ([ verifyEmbed ]),
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
        ),
      ]
    });
    if (!sendChannel) {//the bot couldn't send the embed , hope not 
      return interaction.reply({content:`There was an error! Please try again later.`, ephemeral:true});
    }
    else {//Send the embed to mentioned channel
      return interaction.reply({content:`Verification channel was successfully set!`, ephemeral:true});
    }
  }
};
