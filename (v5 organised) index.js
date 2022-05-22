/*
This is the code of a bot for the Tritho's Tree Discord Server!
Fully developed by 84mb#1535

There are comments describing the purpose of most of the lines and functions
code may be inefficient, but it works 🤷 (:shrug:)
*/
//creating a discord bot client
const { discord ,Client, Intents, MessageEmbed,MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES
  ],
  ws: { 
    properties: { 
      $browser: "Discord iOS"
    }
  }
});
const { SlashCommandBuilder } = require('@discordjs/builders');
//Logging on
client.login(process.env.TOKEN);
//runs once the client has logged onto the discord api
client.once("ready", ()=>{
	console.log("Bot is online");
	client.channels.cache.get("952435253547499523").send("<@479551871128961026> I am online!");
	process.setMaxListeners(5);
});

//defining and declaring variables
let fs = require('fs');
let accessBlacklistFile = JSON.parse(fs.readFileSync("blacklistedWords.json"));
let accessVoteFile = JSON.parse(fs.readFileSync("votes.json"));
let accessModRoleFile = JSON.parse(fs.readFileSync("modRoles.json"));
let voteLength = accessVoteFile.length;
let blacklistFileData = accessBlacklistFile;
let voteFileData = accessVoteFile;
let prefix = ";";
let i;
let spaceBypass;
let splitMsg;
let msg;
let user;
let id;
let voteId;
let serverId;
let word;
let voteListLength;
let freeRobuxMsg;
let voteEmbed;
let generate;
let wordSplit;
let accessServerModRoleFile;
let blacklistedWord;
let p;
let l;
let hasMod = false;
let modRoles = ["860411322810630155", "860764083459588147", "969505998609993748", "962968576434769991", "866508803636592661"];
let storyChannel = "969504754688466974";

//once the client has received a message
client.on("messageCreate", message=>{
	//return if the author of the message is a bot
	if(message.author.bot){return;}

	// if the user has a role with admin perms, then automatically grant them access
	if(message.member.permissions.has("ADMINISTRATOR")){
		hasMod = true;
	}
	// if the user doesn't have admin perms, but is trusted with bot commands, this loop will cycle through all of the mod roles
	for(let i=0; i<modRoles.length;i++){
		if(message.member.roles.cache.has(modRoles[i])){
			hasMod = true;
		}
	}
	
		//setting variables to message properties
    word = message.content.toLowerCase();
    accessServerModRoleFile = accessModRoleFile[serverId]
    serverId = message.guild.id;
    tag = message.author.tag;
    id = message.author.id;
    blacklistedWord = accessBlacklistFile.indexOf(word);
    //if the message sent starts with 'hello', then send 'Hello <@user>'
	if(message.content.startsWith("hello")){
    	if(message.channel.id == storyChannel){return};
		message.channel.send("Hello <@"+id+">!");
	}

	
	if(message.channel.id == storyChannel){
		//creates an array with the letters of the message
		splitMsg = message.content.split("");
		spaceBypass = 0;
		    //checks whether there are more than 2 dots (periods), commas, underscores and dashes
		for(let i = 0;i<splitMsg.length;i++){
		    if(splitMsg[i]=="."||splitMsg[i]==","||splitMsg[i]=="_"||splitMsg[i]=="-"){
				spaceBypass++;
			}
		}
		//checks if there is a space in the message
		if(message.content.indexOf(" ")!==-1){
			if(hasMod==true){
			    message.channel.send("Woah there <@"+id+">! That phrase has a space in it but since you're a mod I'll let it slide.....")
			    .then(message => {
			        //delete the message after 5s
				   	setTimeout(() => message.delete(), 5000)
			  	})
			}
			else{
			    message.channel.bulkDelete(1);
			}
		//checks if there is a blacklisted word in the message
		}else if(accessBlacklistFile.indexOf(word)!==-1){
		    if(hasMod==true){
			    message.channel.send("Woah there <@"+id+">! That word is blacklisted but since you're a mod I'll let it slide.....")
				.then(message => {
			    	//delete the message after 5s
			   		setTimeout(() => message.delete(), 5000)
			  	})
			}
			else{
			   	message.channel.bulkDelete(1);
			}
		}
		else if(spaceBypass>1){
			if(hasMod==true){
			    message.channel.send("Woah there <@"+id+">! I have detected that your message is trying to bypass my space filters but since you're a mod I'll let it slide.....")
			    .then(message => {
			     	//delete the message after 5s
			   		setTimeout(() => message.delete(), 5000)
			  	})
			}
			else{
			  	message.channel.bulkDelete(1);
			}
		}
		return;
	}


	//if the message is ';code' then send them a link to the code
	if(word==";code"){
      	if(message.channel.id == storyChannel){return};
      	message.channel.send(" Hey <@"+id+">! \n \n I am a discord bot coded by 84mb#1535. I am made for the Tritho's Tree Discord Server! \n \n You can access my code on GitHub, on the link below! (If the link is not there, ask a moderator to give me link perms :smile:)");
      	message.channel.send("https://github.com/84mb/1-Word-Story-Bot <-- thats my github page");
	    return;
    }

	    // i will stop explaining the first if statements now
    if(message.content.startsWith(prefix+"blacklist ")){
    	if(message.channel.id == storyChannel){return};
    	//calls to the function we had in the start: hasMod
	    if(hasMod==false){
	      message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
	      return;
	    }else{
	    	//These next 2 lines remove ";blacklist" from the message
	    	//for example, if the user said ";blacklist test", the next 2 lines will make the variable 'word' equal to "test"
	    	wordSplit = word.split(";blacklist ");
	    	word = wordSplit[1];
	      	
	      	//Now this if statement checks whether the word the user wants to blacklist is not in the list of blacklisted words in the blacklists.json file
	    	if(accessBlacklistFile.indexOf(word)==-1) {
	    		//adds the word to the blacklisted words list
		      	blacklistFileData.push(word)
		      	//updates the JSON file
		        fs.writeFileSync("blacklistedWords.json",JSON.stringify(blacklistFileData,null,2));
		        message.channel.send("New word added - "+word);
	      	}
	      	//checks if the word is the blacklisted list
		    else if(accessBlacklistFile.indexOf(word)!==-1){
		    	message.channel.send("'"+word+"'"+" already on the list :rofl:");
		    }
	    }
	    return;
	}

	if(message.content.startsWith(prefix+"unblacklist ")){
    	if(message.channel.id == storyChannel){return};
    	//calls to the function we had in the start: hasMod
	    if(hasMod==false){
	      message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
	      return;
	    }else{
	    	//These next 2 lines remove ";unblacklist" from the message
	    	//for example, if the user said ";unblacklist test", the next 2 lines will make the variable 'word' equal to "test"
	      	wordSplit = word.split(";unblacklist ");
	      	word = wordSplit[1];
	      	//Now this if statement checks whether the word the user wants to remove from the blacklist list is not in the list of blacklisted words in the blacklists.json file
	      	if(accessBlacklistFile.indexOf(word)!==-1){
	      		//finds where the word is located
		        const index = accessBlacklistFile.indexOf(word);
		        if(index > -1){
		        	//removes the blacklisted word from the list
		        	accessBlacklistFile.splice(index, 1);
	        	}
	        	//joins the array of blacklisted words
		        blacklistFileData.join("");
		        //updates the JSON file
		        fs.writeFileSync("blacklistedWords.json",JSON.stringify(blacklistFileData,null,2));
		        message.channel.send("word removed - "+word);
	      	}
	      	else{
	        	message.channel.send("'"+word+"'"+" isn't on the blacklisted list :rofl:");
	      	}
	    }
	    return;
	}

	if(message.content==prefix+"blacklistlist"){
    	if(message.channel.id == storyChannel){return};
	    if(hasMod==false){
	        message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
	        return;
	    }
	    //checks if there are any blacklisted words in the list
	    if(accessBlacklistFile[0]==undefined){
	        message.channel.send("Add a word to the blacklist list by typing the command ';blacklist' followed by the word you want to blacklist");
	    }else{
	    	//if there are, add them together, separated by ", "
	        message.channel.send(accessBlacklistFile.join(", "));
	    }
	    return;
    }

    if(message.content.startsWith(prefix+"blacklisthelp")){
    	if(message.channel.id == storyChannel){return};
    	//creates an embedded message
      	const blacklistHelpEmbed = new MessageEmbed()
      		//setting the colour on the left hand side of the embed
        	.setColor('#696969')
        	//sets the title
          	.setTitle('Blacklist Commands')
          	//sets the autho
          	.setAuthor({ name: "One Word Story Bot", iconURL: "https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png"})
          	//sets description
          	.setDescription('List of blacklist commands below: \n')
          	//sets thumbnail
          	.setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
          	//sets smaller text areas
         	.addFields(
            	{ name: ';blacklistlist', value: "Shows the list of blacklisted words"+"\n"},
              	{ name: ';blacklist', value: "adds a word to the blacklist list (only for people with a moderator role)"+"\n"},
              	{ name: ";unblacklist", value: "removes a word from the blacklist list (only for people with a moderator role)"}
            )
            //sets timestamp (kinda useless)
          	.setTimestamp()
          	//sets the footer
          	.setFooter({
            	text: "OneWordStory", 
            	iconURL: client.user.displayAvatarURL()
          	});
        //sends the embedded message
     	message.channel.send({ embeds: [blacklistHelpEmbed] });
	    return;
    }

	if(message.content.startsWith(";blacklist")){
    	message.channel.send("You have used the wrong syntax, please say ;blacklisthelp to view the command list");
    }

	

	if(message.content.startsWith(prefix+"help")){
    	if(message.channel.id == storyChannel){return};
		//creates embed
    	const exampleEmbed = new MessageEmbed()
          	.setColor('#696969')
          	.setTitle('Help')
          	.setAuthor({ name: "One Word Story Bot", iconURL: "https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png"})
          	.setDescription('List of commands below: \n')
          	.setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
          	.addFields(
              	{ name: ';blacklistlist', value: "Shows the list of blacklisted words"+"\n"},
              	{ name: ';code', value: "Sends a link to the github page"+"\n"},
              	{ name: ";generaterobux", value: "randomly generates between 1 and 10000 robux"},
              	{ name: ';blacklisthelp', value: "shows blacklist commands"+"\n"},
              	{ name: ';votehelp', value: "shows voting commands"+"\n"},
              	{ name: ';requestfeature + feature details', value: "sends a message to <@479551871128961026> with the feature details"+"\n"},
              	{ name: ';reportbug + which command you tried to used', value: "sends a message to <@479551871128961026> with the command"+"\n"}
          	)
          	.setTimestamp()
          	.setFooter({ text: 'If you see this, do the command ;isawit'});
      	message.channel.send({ embeds: [exampleEmbed] });
	    return;
  	}

  	if(message.content.startsWith(prefix+"requestfeature ")){
    	if(message.channel.id == storyChannel){return};
  		p = word.split(";requestfeature");
  		l = p[1];
  		client.users.fetch('479551871128961026').then((user) => {
      		user.send(message.author.tag+" wants you to add: \n"+l);	
  		})
	    return;
	}

	if(message.content.startsWith(prefix+"reportbug ")){
    	if(message.channel.id == storyChannel){return};
		let lp = word.split(";reportbug");
		let pl = lp[1];
  		client.users.fetch('479551871128961026').then((user) => {
      		user.send(message.author.tag+" says there is a bug: \n"+pl);	
  		})
	    return;
	}

	// POLL COMMANDS
	if(message.content==";votehelp"){
    	if(message.channel.id == storyChannel){return};
		voteHelpEmbed = new MessageEmbed()
	    	.setColor('#696969')
	        .setTitle(";vote commands")
	        .setThumbnail(client.user.displayAvatarURL())
	    	.setDescription("List of vote commands \n\n")
	        .addFields(
	            { name: ';votecreate + poll name', value: "Create a poll"+"\n"},
	            { name: ';closevote + poll name', value: "closes the vote so nobody can vote anymore (**CAUTION: if you close a poll you can no longer open it**)"+"\n"},
	            { name: ";voteresults + poll name", value: "displays the results of the vote"+"\n"},
	            { name: ';voteremove', value: "removes a poll"+"\n"},
	            { name: ';votelist', value: "shows the list of polls"+"\n"}
	        )
	        .setFooter({ 
	            text: "OneWordStory", 
	            iconURL: client.user.displayAvatarURL()
	        });
	  	message.channel.send({ephemeral: true, embeds: [voteHelpEmbed]});
	    return;
	}

	if(message.content.startsWith(";votecreate ")){
    	if(message.channel.id == storyChannel){return};
	    if(hasMod==false){message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:");return};
	    wordSplit = word.split(";votecreate ");
	    word = wordSplit[1];
	  	console.log("creating poll named "+word)
	  	//creating 2 buttons with the names of 'yes' and 'no'
	    let yes = new MessageActionRow()
	  		.addComponents(
	  			new MessageButton()
	  				.setCustomId("yes,"+word)
	  				.setLabel('Yes')
	  				.setStyle('SUCCESS'),
	  		);
	    let no = new MessageActionRow()
	  		.addComponents(
	  			new MessageButton()
	  				.setCustomId("no,"+word)
	  				.setLabel('No')
	  				.setStyle('DANGER'),
	  		);
	        voteEmbed = new MessageEmbed()
	      		.setColor('#696969')
	      		.setTitle(word)
	          	.setTimestamp()
	      		.setDescription("<@"+id+"> has created a poll named: '"+word+"'");
		    if(accessVoteFile[word]==undefined){
	    	// if the poll name isn't taken yet, create a poll
	        message.channel.send({ephemeral: true, embeds: [voteEmbed], components: [yes, no]});  
	        voteFileData[word] = {"name":word,"yes":[],"no":[]}
	        fs.writeFileSync("votes.json",JSON.stringify(voteFileData,null,2));
	    }
	    else if(accessVoteFile[word]!==undefined){
	    	// if the poll name is taken, tell the user the poll has to be renamed
	       	message.channel.send("'"+word+"'"+" is a taken poll name, please rename it");
	    }else{
	        message.channel.send("uhhhhh idrk what happened but this is not supposed to happen \n"+"error (accessVoteNameFile[word]): "+accessVoteFile[word] +"@84mb#1535");
	    }
	    return;
	}

	if(message.content.startsWith(";closevote ")){
    	if(message.channel.id == storyChannel){return};
	    if(hasMod==false){message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:");return;};
	    msg = message.content.toLowerCase();
	    wordSplit = msg.split(";closevote ");
	    word = wordSplit[1];
	    voteId = accessVoteFile[word]
	    //checks if the poll exists
	    if(accessVoteFile[word]==undefined){
	      	message.channel.send("There is no vote with the name '"+word+"'");
	      	return;
	    }
	    //the poll exists, and hasn't been closed yet, then close it
	    if(voteId["closed"]==undefined){
	      	voteId["closed"] = "";
	      	fs.writeFileSync("votes.json",JSON.stringify(voteFileData,null,2));
	      	message.channel.send("The vote '"+word+"' has now been closed");
	    }else{
	      	message.channel.send("This vote has already been closed");
	    }
	    return;
    
  	}
	if(message.content.startsWith(";voteremove")){
    	if(message.channel.id == storyChannel){return};
	    message.channel.send("This feature is still in development, please wait until it is fully implemented")
	    return;
	}
	if(message.content.startsWith(";votelist")){
    	if(message.channel.id == storyChannel){return};
	    message.channel.send("This feature is still in development, please wait until it is fully implemented")
	    return;
	}

	if(message.content.startsWith(";voteresults ")){
    	if(message.channel.id == storyChannel){return};
	    if(hasMod==false){message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:");return};
	    splitWord = message.content.split(";voteresults ");
	    word = splitWord[1];
	    voteId = accessVoteFile[word];
	    if(voteId==undefined){
	      	message.channel.send("no poll with that name exists!");
	      	return;
	    }
	    yes = voteId["yes"].length;
	    no = voteId["no"].length;
	    no = no.toString()
	    yes = yes.toString()
	    voteResultsEmbed = new MessageEmbed()
	    	.setColor('#696969')
	        .setTitle("'"+word+"'")  
	        .setThumbnail(client.user.displayAvatarURL())
	    	.setDescription("the poll '**"+word+"**'s results are out! \n (you can still vote in this poll until a moderator closes it)")
	        .addFields(
	        	{ name: yes, value: "people voted yes" },
	        	{ name: no, value: "people voted no", inline: true  },
	        )
		    .setFooter({ 
	            text: "OneWordStory", 
	            iconURL: client.user.displayAvatarURL()
	        });
	    message.channel.send({ephemeral: true, embeds: [voteResultsEmbed]});
	    return;
	}

	if(message.content.startsWith(";vote")){
	   	message.channel.send("You have used the wrong syntax, please say ;votehelp to view the command list");
	}
});

// when a button is clicked, run the code
client.on("interactionCreate", async (interaction) => {
	//checks if the interaction is a button
  	if(interaction.isButton()){
	    id = interaction.customId;
	    id = id.split(",");
	    voteId1 = accessVoteFile[id[1]];
	    voteId2 = voteId1[id[0]]
		//if they voted but the poll has ended, then secretly tell the person
	    if(voteId1["closed"] !== undefined){
	      	message = await interaction.reply({ content: 'This vote has already ended :shrug:', ephemeral: true });
	      	return;
	    }
	    i = 0;
	    voteYes = voteId1["yes"];
	    voteNo = voteId1["no"];
	    yesOrNo = id[0];
	    if(voteYes.indexOf(interaction.user.tag)==-1){
	      	i++;
	    }
	    if(voteNo.indexOf(interaction.user.tag)==-1){
	      	i++;
	    }
	    if(i==2){
	      	console.log("added vote")
	      	voteId2.push(interaction.user.tag)
	      	fs.writeFileSync("votes.json",JSON.stringify(voteFileData,null,2));
	      	message = await interaction.reply({ content: "Voted '"+id[0]+"'", ephemeral: true });
	      	return;
	    }
		    //change vote
	    if(id[0]=="no"){
	      	if(voteId1["no"].includes(interaction.user.tag)){
	        	message = await interaction.reply({ content: 'Your vote is already no', ephemeral: true });
	        	return;
	     	}
			const index = voteYes.indexOf(interaction.user.tag);
			voteYes.splice(index, 1);
			voteNo.push(interaction.user.tag)
			fs.writeFileSync("votes.json",JSON.stringify(voteFileData,null,2));
		    message = await interaction.reply({ content: 'Your vote has changed to no', ephemeral: true });
	 		return;
    	}
    	else if(id[0]=="yes"){
      		if(voteId1["yes"].includes(interaction.user.tag)){
        	message = await interaction.reply({ content: 'Your vote is already yes', ephemeral: true });
        	return; 
      	}
      	const index = voteNo.indexOf(interaction.user.tag);
      	voteNo.splice(index, 1);
      	voteYes.push(interaction.user.tag)
      	fs.writeFileSync("votes.json",JSON.stringify(voteFileData,null,2));
      	message = await interaction.reply({ content: 'Your vote has changed to yes', ephemeral: true });
     	return;
    	}
    	else{
      	message = await interaction.reply({ content: 'You have already voted', ephemeral: true });
    	}
    }
}) 
