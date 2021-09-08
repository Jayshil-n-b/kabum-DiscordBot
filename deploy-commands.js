const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [{
  name: 'ready',
  description: 'checks bot'
}]; 

const rest = new REST({ version: '9' }).setToken('ODgxMTU0Njk3MTYxOTk4Mzk5.YSotQg.HFUYZOZizzmtmyr9EV-Qy4VH_CM');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands('881154697161998399', '881043040234512415'),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();