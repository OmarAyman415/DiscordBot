const { EmbedBuilder } = require('@discordjs/builders');
const { GuildMember } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const {user, guild} = member
        const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL)
        const welcomeMessage = `Welcome ya Zmily <@${member.id}>`;
        const memberRole = process.env.OUTSIDER_ROLE;

        const welcomeEmbed = new EmbedBuilder()
            .setTitle("New Member!")
            .setDescription(welcomeMessage)
            .setColor(0x037821)
            // .addFields(name: 'Total Members', value: `${guild.memberCount}`)
            .setTimeStamp()

        welcomeChannel.send({ embeds: [welcomeEmbed] });
        member.roles.add(memberRole)
    }
}

