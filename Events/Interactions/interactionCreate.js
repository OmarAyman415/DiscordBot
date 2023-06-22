const { CommandInteraction } = require('discord.js');

//This event listens to all interactions happens with bot 
module.exports = {
  name: 'interactionCreate',
  execute(interaction, client) {

    if (interaction.isChatInputCommand()) {//if the interaction is a chat input then get it's data

      const command = client.commands.get(interaction.commandName);
      
      if (!command) {
        interaction.reply({ content: 'Outdated command' });
      } 
      command.execute(interaction, client);// then execute it
    } else if (interaction.isButton()) {// if the interaction was a button pressed then it's a verification button pressed

      const role = interaction.guild.roles.cache.get(process.env.OUTSIDER_ROLE);// get Outsider role id

      return interaction.member.roles.add(role).then((member) => //add Outsiders role to the user who pressed the button
        interaction.reply({
          content: `${role} has been assigned to you ${member}`,
          ephemeral: true,// only the user pressed the button see the message
        })
      );
    } else {//for now there no other interactions that the users can do with the Bot
      return;
    }
  },
};
