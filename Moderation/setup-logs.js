const {SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js')

const logSchema = require('../Models/Logs')


module.exports = {
  data: new SlashCommandBuilder()
        .setName("setup-logs")
        .setDescription("Set up your logging channel for audit logs.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName("Channel")
                  .setDescription("Channel for Logging messages.")
                  .setRequired(true)
        ),
  async execute(interaction){
    const {channel, guildID, option} = interaction;
    const logChannel = options.getChannel("channel") || channel;
    const embed = new EmbedBuilder();

    logSchema.findOne({Guild: guildId}, async (err, data) =>{
      if(!data){
          await logSchema.create({
              Guild: guildId,
              Channel: channel,
          });

          embed.setDescription("Data was successfully sent to the Database")
              .setColor("Green")
            .setTimestamp();
        }
      else if (data) {
          logSchema.deleteOne({ Guild: guildId });
          await logSchema.create({
              Guild: guildId,
              Channel: logChannel.id
          });

          embed.setDescription("Old data was successfully replaced")
              .setColor("Green")
            .setTimestamp();
        }

        if (err) {
            embed.setDescription("Something went wrong")
                .setColor("Red")
            .setTimestamp()
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    })
  }
}