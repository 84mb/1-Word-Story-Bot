const { Client, SlashCommandBuilder, EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('node:fs');
const blacklistFile = JSON.parse(fs.readFileSync("resources/blacklists.json"));
const validCharacters = /[abcdefghijklmnopqrstuvwxyz1234567890 s]/;



module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Add, remove or view the list of blacklisted words!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('add')
            .setDescription('add a word to the blacklist list')
            .addStringOption(option =>
                option.setName('word')
                .setDescription('The word you want to add'))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('remove')
            .setDescription('remove a word to the blacklist list')
            .addStringOption(option =>
                option.setName('word')
                .setDescription('The word you want to remove'))
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('list')
            .setDescription('view the blacklist list')
        )
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false), // the addStringOption() should be inside addSubcommand()
    async execute(interaction) {
    	try{
        // you should start a subcommand like this
        //const tick = client.emojis.cache.get("1053583399417282590");
        //const cross = client.emojis.cache.get("1053583396137345084");


	        const userId = interaction.user.id;
			const serverId = interaction.guild.id;
			if(!blacklistFile[serverId]){
				blacklistFile[serverId] = [];
			    console.log(`created blacklist storage in ${interaction.guild.name}`);
			}
			blacklistServerFile = blacklistFile[serverId];
			fs.writeFileSync("resources/blacklists.json", JSON.stringify(blacklistFile, null, 2));


	        switch (interaction.options.getSubcommand()) {
	            case "add":
	            default:
	                {
	                    // and then define its options like you would in a normal command . e.x. :
	                    const input = interaction.options.getString('word');
	                    console.log(`${interaction.user.username} tried adding '${input}' to the blacklist list in the server ${interaction.guild.name}`)
	                    if(!input){
		                	const blacklistEmbed = new EmbedBuilder()
					          .setColor('#696969')
					          .setTitle('<:redcross:1053583396137345084> Error')
					          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					          .addFields(
					            { name: 'Reason: ', value: `input cannot be nothing` }
					          )
					          .setFooter({
					            text: "1WordStory",
					            iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					          });
	                    	interaction.reply({ embeds: [blacklistEmbed] })
	                    	return;
	                    }else if(blacklistFile[serverId].indexOf(input)>-1){
		                	const blacklistEmbed = new EmbedBuilder()
					          .setColor('#696969')
					          .setTitle('<:redcross:1053583396137345084> Error')
					          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					          .addFields(
					            { name: 'Reason: ', value: `You cannot blacklist a word that is already blacklisted` }
					          )
					          .setFooter({
					            text: "1WordStory",
					            iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					          });
	                    	interaction.reply({ embeds: [blacklistEmbed] })
	                    	return;
	                    }

					    for(let i = 0; i < input.length; i++){
					    	validityTest = validCharacters.test(input[i]);
					    	if(!validityTest){
			                	const blacklistEmbed = new EmbedBuilder()
						          .setColor('#696969')
						          .setTitle('<:redcross:1053583396137345084> Error')
						          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
						          .addFields(
						            { name: 'Reason: ', value: `You cannot blacklist multiple letters` }
						          )
						          .setFooter({
						            text: "1WordStory",
						            iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
						          });
		                    	interaction.reply({ embeds: [blacklistEmbed] })
		                    	return;
					    		message.channel.bulkDelete(1);
					    		console.log(`did not pass validity test`)
					    		return;
					    	}
					    }
					    console.log(`passed validity test`)
	                    blacklistFile[serverId].push(input);
	                    fs.writeFileSync("resources/blacklists.json", JSON.stringify(blacklistFile, null, 2));
		                const blacklistEmbed = new EmbedBuilder()
					      .setColor('#696969')
					      .setTitle('Blacklisted Word')
					      .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					      .addFields(
						        { name: 'Word added: ', value: input }
					      )
					      .setFooter({
					        text: "1WordStory",
					        iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					      });
	                    interaction.reply({ embeds: [blacklistEmbed] })
	                    return;
	                    //interaction.reply({ content: input });
	                    break;

	                }

	            case "remove":
	                {	

	                    const input = interaction.options.getString('word');
	                    console.log(`${interaction.user.username} tried removing '${input}' in the blacklist list in the server ${interaction.guild.name}`)
	                    // and then define its options like you would in a normal command . e.x. :
	                    if(blacklistFile[serverId].indexOf(input)==-1){
		                	const blacklistEmbed = new EmbedBuilder()
					          .setColor('#696969')
					          .setTitle('<:redcross:1053583396137345084> Error')
					          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					          .addFields(
					            { name: 'Reason: ', value: `You cannot remove a word that does not exist on the blacklist list` }
					          )
					          .setFooter({
					            text: "1WordStory",
					            iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					          });
	                    	interaction.reply({ embeds: [blacklistEmbed] })
	                    	return;
	                    }
	                    const index = blacklistFile[serverId].indexOf(input);
	                    blacklistFile[serverId].splice(index, 1);
	                    fs.writeFileSync("resources/blacklists.json", JSON.stringify(blacklistFile, null, 2));
		                const blacklistEmbed = new EmbedBuilder()
					      .setColor('#696969')
					      .setTitle('Removed word')
					      .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					      .addFields(
					        { name: 'Word: ', value: input }
					      )
					      .setFooter({
					        text: "1WordStory",
					        iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					      });
	                    interaction.reply({ embeds: [blacklistEmbed] })
	                    return;

	                    interaction.reply("remove "+input);
	                    //interaction.reply({ content: input });
	                    break;

	                }

	            case "list":
	                {
	                    if(!blacklistServerFile[0]){
		                	const blacklistEmbed = new EmbedBuilder()
					          .setColor('#696969')
					          .setTitle('Blacklist List')
					          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					          .addFields(
					            { name: 'Blacklisted Words: ', value: `The blacklist list is currently empty.\nAdd a word to the blacklist file by saying '/blacklist add [word]'` }
					          )
					          .setFooter({
					            text: "1WordStory",
					            iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					          });
	                    	interaction.reply({ embeds: [blacklistEmbed] });
	                    	return
	                    }
	                    // and then define its options like you would in a normal command . e.x. :
	                    console.log(`${interaction.user.username} viewed '${blacklistServerFile.join(", ")}' in the server ${interaction.guild.name}`)
	                	const blacklistEmbed = new EmbedBuilder()
				          .setColor('#696969')
				          .setTitle('Blacklist List')
				          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
				          .addFields(
				            { name: 'Blacklisted Words: ', value: blacklistServerFile.join(", ") }
				          )
				          .setFooter({
				            text: "1WordStory",
				            iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
				          });

	                    interaction.reply({ embeds: [blacklistEmbed] });
	                    //interaction.reply({ content: input });
	                    break;

	                }


	        }
    	}
    	catch(err){
		    const blacklistEmbed = new EmbedBuilder()
			  .setColor('#696969')
			  .setTitle('Error <:redcross:1053583396137345084>')
			  .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
			  .addFields(
			    { name: 'Reason: ', value: err }
			  )
			  .setFooter({
			    text: "1WordStory",
			    iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
			  });
	        await interaction.reply({ embeds: [blacklistEmbed] })
    	}


    },
};


/*const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Add, remove or view the list of blacklisted words!')

		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('add a word to the blacklist list'))
				.addStringOption(option =>
					option.setName('adds')
						.setDescription('The word you want to add'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('remove a word to the blacklist list'))
				.addStringOption(option =>
					option.setName('del')
						.setDescription('The word you want to remove'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('list')
				.setDescription('view the blacklist list')),



				*/
		

		/*.addStringOption(option =>
			option.setName('function')
				.setDescription('Select the function')
				.setRequired(true)
				.addChoices(
					{ name: 'add', value: 'add' },
					{ name: 'delete', value: 'remove' },
					{ name: 'list', value: 'list' },
				))
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The word you want to add/delete (leave empty if list)')),*/
	//async execute(interaction) {
		/*if (interaction.options.getString("function")=="add") {
			await interaction.reply(`Adding ${interaction.option.getString("input").value}!`)
			return;
		}else if (interaction.options.getString("function")=="remove") {
			await interaction.reply(`Adding ${interaction.option.getString("input").value}!`)
			return;
		}*/
		//if(interaction.option.getSubCommand()=="user"){}
        //await interaction.reply(interaction.option.getString("input"))
        //await interaction.reply(interaction.option.getString("input"))
	/*},
};*/