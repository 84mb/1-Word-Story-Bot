const { Client, SlashCommandBuilder, EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('node:fs');
const xpFile = JSON.parse(fs.readFileSync("resources/xp.json"));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('xp')
		.setDescription('check your/another members xp')
		.addUserOption(option =>
			option.setName('person')
				.setDescription('i will say whatever you want me to say')),
	async execute(interaction) {
		const userId = interaction.user.id;
		const serverId = interaction.guild.id;
		serverXp = xpFile[serverId];
		if(interaction.options.getUser("person")!==null){
			if(!serverXp[interaction.options.getUser("person").id]){
			    const xpEmbed = new EmbedBuilder()
				  .setColor('#696969')
				  .setTitle(`${interaction.options.getUser("person").username}'s xp`)
				  .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
				  .addFields(
				    { name: 'XP: ', value: `This person hasn't used a command yet!` }
				  )
				  .setFooter({
				    text: "1WordStory",
				    iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
				  });
		        await interaction.reply({ embeds: [xpEmbed] })
		        return;
			}
		    const xpEmbed = new EmbedBuilder()
			  .setColor('#696969')
			  .setTitle(`${interaction.options.getUser("person").username}'s xp`)
			  .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
			  .addFields(
			    { name: 'XP: ', value: `${serverXp[interaction.options.getUser("person").id].xp} ` }
			  )
			  .setFooter({
			    text: "1WordStory",
			    iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
			  });
	        await interaction.reply({ embeds: [xpEmbed] })
	        return;
	    }
	    console.log(typeof serverXp[userId].xp)
	    const xpEmbed = new EmbedBuilder()
		  .setColor('#696969')
		  .setTitle(`${interaction.user.username}'s xp`)
		  .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
		  .addFields(
		    { name: 'XP: ', value: `${serverXp[userId].xp} ` }
		  )
		  .setFooter({
		    text: "1WordStory",
		    iconURL: 'https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png'
		  });
        await interaction.reply({ embeds: [xpEmbed] })

	},
};