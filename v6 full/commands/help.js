const { Client, SlashCommandBuilder, EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('view command names')
        .addStringOption(option =>
			option.setName('function')
				.setDescription('Select the function')
				.setRequired(true)
				.addChoices(
					{ name: 'general', value: 'a home page for all commands' },
					{ name: 'blacklist', value: 'shows blacklist commands' },
					{ name: 'poll', value: 'shows poll commands (coming soon)' },
				)),
        
        /*.addSubcommand(subcommand =>
            subcommand
            .setName('general')
            .setDescription('a home page for all commands')
        )																			*/
        /*.addSubcommand(subcommand =>
            subcommand
            .setName('blacklist')
            .setDescription('remove a word to the blacklist list')
            .addStringOption(option =>
                option.setName('word')
                .setDescription('The word you want to remove'))	
        )																			*/
    async execute(interaction) {
    	try{
        // you should start a subcommand like this
        //const tick = client.emojis.cache.get("1053583399417282590");
        //const cross = client.emojis.cache.get("1053583396137345084");



	        switch (interaction.options.getString("function")) {
	            case "general":
	            default:
	                {
	                    // and then define its options like you would in a normal command . e.x. :
	                    console.log(`${interaction.user.username} viewed ${interaction.options.getString("function")} help in the server ${interaction.guild.name}`)
	                    
		                const helpEmbed = new EmbedBuilder()
					      .setColor('#696969')
					      .setTitle('Help')
					      .setDescription('Slash Commands')
					      .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					      .addFields(
					        { name: '/blacklist [add/remove/list] [word]: ', value: `adds/removes/views a word(s) from/to the blacklist list` },
					        { name: `/help [general, blacklist, poll]`, value: `gives help commands`},
					      )
					      .setFooter({
					        text: "1WordStory",
					        iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					      });
	                    interaction.reply({ embeds: [helpEmbed] })
	                    return;
	                    break;

	                }

	            case "blacklist":
	                {	

	                    
	                    // and then define its options like you would in a normal command . e.x. :
	                    console.log(`${interaction.user.username} viewed ${interaction.options.getSubcommand()} help in the server ${interaction.guild.name}`)
	                    
		                const helpEmbed = new EmbedBuilder()
					      .setColor('#696969')
					      .setTitle('Blacklist Help')
					      .setDescription('Blacklist Slash Commands')
					      .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					      .addFields(
					        { name: '/blacklist [add] [word]: ', value: `adds a word to the blacklist list` },
					        { name: '/blacklist [remove] [word]: ', value: `removes a word from the blacklist list`},
					        { name: '/blacklist [list] [word]: ', value: `views the words from the blacklist list`},
					      )
					      .setFooter({
					        text: "1WordStory",
					        iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					      });
	                    interaction.reply({ embeds: [helpEmbed] })
	                    return;
	                    break;

	                }

	            case "poll":
	                {
	                    
	                    // and then define its options like you would in a normal command . e.x. :
	                    console.log(`${interaction.user.username} viewed ${interaction.options.getSubcommand()} help in the server ${interaction.guild.name}`)
	                    
		                const helpEmbed = new EmbedBuilder()
					      .setColor('#696969')
					      .setTitle('Poll Help (coming soon)')
					      .setDescription('Poll Slash Commands')
					      .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
					      .addFields(
					        { name: `polls`, value: `coming soon`},
					      )
					      .setFooter({
					        text: "1WordStory",
					        iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
					      });
	                    interaction.reply({ embeds: [helpEmbed] })
	                    return;
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