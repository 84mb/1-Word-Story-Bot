const { SlashCommandBuilder } = require('discord.js');

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
	async execute(interaction) {
		/*if (interaction.options.getString("function")=="add") {
			await interaction.reply(`Adding ${interaction.option.getString("input").value}!`)
			return;
		}else if (interaction.options.getString("function")=="remove") {
			await interaction.reply(`Adding ${interaction.option.getString("input").value}!`)
			return;
		}*/
		//if(interaction.option.getSubCommand()=="user"){}
        //await interaction.reply(interaction.option.getString("input"))
        await interaction.reply(interaction.option.getString("input"))
	},
};