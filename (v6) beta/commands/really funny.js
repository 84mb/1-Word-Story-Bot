const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('i will say whatever you want me to say')
		.addStringOption(option =>
			option.setName('word')
			.setDescription('i will say whatever you want me to say')),
	async execute(interaction) {
		await interaction.reply(interaction.options.getString("word"))
	},
};