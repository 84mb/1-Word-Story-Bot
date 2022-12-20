const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, EmbedBuilder, discord, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { token } = require('./config.json');
const xpFile = JSON.parse(fs.readFileSync("resources/xp.json"));
const blacklistFile = JSON.parse(fs.readFileSync("resources/blacklists.json"));

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers
]});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	client.user.setPresence({
	  status: "idle"
	})
	client.user.setActivity(";help", {
	  type: "LISTENING"
	});
	client.channels.cache.get("952435253547499523").send("<@479551871128961026> I am online!");
});
client.commands = new Collection();
// Log in to Discord with your client's token
client.login(token);


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		console.log(command.data.name)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

/*const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}*/

client.on("messageCreate", message => {
	if(!blacklistFile[message.guild.id]){
		return;
	}
	let serverBlacklist = blacklistFile[message.guild.id];
	for(let i = 0; i < serverBlacklist.length; i++){
	    if (message.content.indexOf(serverBlacklist[i]) > -1) {
	        console.log(`deleted '${message.content}', said by '${message.author.username}' in '${message.channel.name}' in '${message.guild.name}'`)
	        message.channel.bulkDelete(1);
	        return;
	    }
    }
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const userId = interaction.user.id;
	const serverId = interaction.guild.id;
	if(!xpFile[serverId]){
		xpFile[serverId] = {};
	    console.log(`created xp system in ${interaction.guild.id}`);
	}
	const serverXp = xpFile[serverId]
	if(!serverXp[userId]){
		serverXp[userId] = { xp: 1 }
	    fs.writeFileSync("resources/xp.json", JSON.stringify(xpFile, null, 2));
	    console.log(`created for ${interaction.user.username} in ${interaction.guild.name}`);
	}
	
	serverXp[userId].xp++;
	fs.writeFileSync("resources/xp.json", JSON.stringify(xpFile, null, 2));
	console.log("")
	console.log(`${interaction.user.username} used the command ${interaction.commandName} in ${interaction.guild.name} server`);
	


	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		//await interaction.reply({ content: '<:redcross:1053583396137345084> There was an error while executing this command!', ephemeral: true });
	    const errEmbed = new EmbedBuilder()
		  .setColor('#696969')
		  .setTitle('Error <:redcross:1053583396137345084>')
		  .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
		  .addFields(
		    { name: 'Reason: ', value: error }
		  )
		  .setFooter({
		    text: "1WordStory",
		    iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
		  });
        await interaction.reply({ embeds: [errEmbed] })
        return;
	}
});