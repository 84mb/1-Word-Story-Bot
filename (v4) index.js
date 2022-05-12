//declaring and importing
const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],ws: { properties: { $browser: "Discord iOS"}} });

const { MessageActionRow, MessageButton } = require('discord.js');

const snowflake = require('discord-snowflake');

let yesOrNo = "yes";
process.setMaxListeners(0);

//also delcaring and importing
let fs = require('fs'); //importing file save
let blacklistedPath = "blacklistedWords.json";
let votePath = "votes.json";
let voteNamePath = "voteName.json";

let blacklistFileRead = fs.readFileSync(blacklistedPath);
let votesFileRead = fs.readFileSync(votePath);
let voteNameFileRead = fs.readFileSync(voteNamePath);

let accessBlacklistFile = JSON.parse(blacklistFileRead);
console.log("accessVoteFile = "+votesFileRead);
let accessVoteFile = JSON.parse(votesFileRead);
let accessVoteNameFile = JSON.parse(voteNameFileRead);

console.log("accessBlacklistFile = "+accessBlacklistFile);
console.log("accessVoteFile = "+accessVoteFile);
//const client = new Discord.Client();
let prefix = ";";
let word;
let voteListLength;

let voteLength = accessVoteFile.length;

let fileData = accessBlacklistFile;
let voteFileData = accessVoteFile;
let voteEmbed;


//Functions
function checkModStatus(){
  switch(hasMod){
    case false:
    break;
    case true:
    return;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



let id;
let voteId;
//Functions on discord

  client.on("messageCreate", message =>{
    let msg;
    let wordSplit;
    let storyChannel = "969504754688466974";
    word = message.content.toLowerCase();
    
    tag = message.author.id;
    let blacklistedWord = accessBlacklistFile.indexOf(word);
    if(message.author.bot){return}
    
    let hasMod=false;
    
    if(message.member.roles.cache.has('860411322810630155')){
      hasMod=true;
    }
    else if(message.member.roles.cache.has('860764680750497803')){
      hasMod=true;
    }
    else if(message.member.roles.cache.has('969505998609993748')){
      hasMod=true;
    }
    else if(message.member.roles.cache.has('962968576434769991')){
      hasMod=true;
    }
      
    //sending discord bot code and brief information about the bot 
    if(message.content.startsWith(prefix+"code")){
      let tag = message.member.user.id;
      console.log(";code command");
      message.channel.send(" Hey <@"+tag+">! \n \n I am a discord bot coded by 84mb#1535. I am made for Tritho's tree! \n \n You can access my code on GitHub, on the link below! (If the link is not there, ask a moderator to give me link perms :smile:)");
      message.channel.send("https://github.com/84mb/1-Word-Story-Bot <-- thats my github page");
      if(message.channel.id == storyChannel){
        message.channel.bulkDelete(1);
      }
    }
  
  
      


  //blacklist command
  if(message.content.startsWith(prefix+"blacklist ")){
    if(hasMod==false){
      message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
      return;
    }else{
       msg = message.content.toLowerCase();
       wordSplit = msg.split(";blacklist ");
      word = wordSplit[1];
      
      if(accessBlacklistFile.indexOf(word)==-1) { //this checks if the blacklisted word has been added
        fileData.push(word)//if not, add it
        //accessBlacklistFile = {}; 
        fs.writeFileSync(blacklistedPath,JSON.stringify(fileData,null,2));
        message.channel.send("New word added - "+word);
      }
      else if(accessBlacklistFile.indexOf(word)!==-1){
        message.channel.send("'"+word+"'"+" already on the list :rofl:");
      }else{
        message.channel.send("uhhhhh idrk what happened but this is not supposed to happen \n"+"error (accessBlacklistFile[word]): "+accessBlacklistFile[word]);
      }
      //we dont like efficiency here
    }
  }
    
  //unblacklist command
  if(message.content.startsWith(prefix+"unblacklist ")){
    if(hasMod==false){
      message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
      return;
    }else{
      msg = message.content.toLowerCase();
      wordSplit = msg.split(";unblacklist ");
      word = wordSplit[1];
      if (accessBlacklistFile.indexOf(word)!==-1) { //this checks if the blacklisted word is in the list
        //fileData.splice((", "+word),1)//if not, add it
        const index = accessBlacklistFile.indexOf(word);
        if (index > -1) {
          accessBlacklistFile.splice(index, 1); // 2nd parameter means remove one item only
        }
        fileData.join("");
        //accessBlacklistFile = {}; 
        fs.writeFileSync(blacklistedPath,JSON.stringify(fileData,null,2));
        message.channel.send("word removed - "+word);
      }
      else{
        message.channel.send("'"+word+"'"+" isn't on the blacklisted list :rofl:");
      }
      //we dont like efficiency here
    }
  }
    
  //checks if channel is the story channel so it can check whether to delete words with spaces or that are in the blacklist list
  if(message.channel.id == storyChannel){
      let splitMsg = message.content.split("")
      let spaceBypass = 0;
      for(let i = 0;i<splitMsg.length;i++){
        if(splitMsg[i]=="."||splitMsg[i]==","||splitMsg[i]=="_"||splitMsg[i]=="-"){
          spaceBypass++;
        }
      }
      if(message.content.indexOf(" ")!==-1){
        if(hasMod==true){
          message.channel.send("Woah there <@"+tag+">! That phrase has a space in it but since you're a mod I'll let it slide.....")
          .then(message => {
    setTimeout(() => message.delete(), 5000)
  })
        }else{
        message.channel.bulkDelete(1);
        }
      }else if(accessBlacklistFile.indexOf(word)!==-1){
        if(hasMod==true){
          message.channel.send("Woah there <@"+tag+">! That word is blacklisted but since you're a mod I'll let it slide.....")
          .then(message => {
    setTimeout(() => message.delete(), 5000)
  })
      }
        else{
        message.channel.bulkDelete(1);
        }
      }else if(spaceBypass>1){
        if(hasMod==true){
          message.channel.send("Woah there <@"+tag+">! I have detected that your message is trying to bypass my space filters but since you're a mod I'll let it slide.....")
          .then(message => {
    setTimeout(() => message.delete(), 5000)
  })
      }
        else{
        message.channel.bulkDelete(1);
        }
      }
  }


if(message.content=="<@963329889363197952>"){
  message.reply("Heya there <@"+tag+">, I'm a bot made by 84mb. You can see what commands I have if you say ';help'. \n seeya later!")
}

if(message.content==prefix+"blacklistlist"){
  if(hasMod==false){
    message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
    return;
  }
  if(accessBlacklistFile[0]==undefined){// accessBlacklistFile.indexOf(word)!==-1
    message.channel.send("Add a word to the blacklist list by typing the command ';blacklist' followed by the word you want to blacklist");
  }else{
    message.channel.send(accessBlacklistFile.join(", "));
  }
}

  //help command
  if(message.content.startsWith(prefix+"help")){
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
              { name: ';votehelp', value: "shows voting commands"+"\n"}
              
              )
          .setTimestamp()
          .setFooter({ text: 'If you see this say ";isawit" in the bot-commands channel'});
  
      message.channel.send({ embeds: [exampleEmbed] });
  }  
    
    
    
    //blacklisthelp command
    if(message.content.startsWith(prefix+"blacklisthelp")){
      const blacklistHelpEmbed = new MessageEmbed()
          .setColor('#696969')
          .setTitle('Blacklist Commands')
          .setAuthor({ name: "One Word Story Bot", iconURL: "https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png"})
          .setDescription('List of blacklist commands below: \n')
          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
          .addFields(
              { name: ';blacklistlist', value: "Shows the list of blacklisted words"+"\n"},
              { name: ';blacklist', value: "adds a word to the blacklist list (only for people with a moderator role)"+"\n"},
              { name: ";unblacklist", value: "removes a word from the blacklist list (only for people with a moderator role)"}
              
              )
          .setTimestamp()
          .setFooter({
            text: "OneWordStory", 
            iconURL: client.user.displayAvatarURL()
          });
  
      message.channel.send({ embeds: [blacklistHelpEmbed] });
      
    }
    
   
   
  
    
    if(message.content.startsWith(prefix+"generate ")){
      msg = message.content;
      wordSplit = msg.split(";generate ");
      word = wordSplit[1];
      
        const freeRobuxMsg = message.channel.send("Generating Free "+word+" - initiating...").then(robux => {
          sleep(5000);
        for(let j = 0;j<1001;j++){
          if(j/100==Math.round(j/100)){
          robux.edit("Generating Free "+word+" - "+j/10+"%")
          sleep(Math.floor(Math.random()+1000 * 10000));          
          }
         }
          sleep(2000);
          robux.edit("You have received "+Math.floor(Math.random() * 10000)+" "+word+"!");
  
          
        } );      
      } 
    
  //votehelp command
if(message.content==";votehelp"){
  voteHelpEmbed = new MessageEmbed()
    		  .setColor('#696969')
          .setTitle(";vote commands")
          .setThumbnail(client.user.displayAvatarURL())
    		  .setDescription("List of vote commands \n\n")
          .addFields(
              { name: ';vote + poll name', value: "Create a poll"+"\n"},
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
  
}
  
  //vote command
if(message.content.startsWith(";vote ")){
    if(hasMod==false){message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:");return};
    msg = message.content.toLowerCase();
    wordSplit = msg.split(";vote ");
    word = wordSplit[1];
    fs.writeFileSync(votePath,JSON.stringify(accessVoteFile,null,2));
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
      		.setDescription("<@"+tag+"> has created a poll named: '"+word+"'");
        
    //moment().format() 
  	//message.channel.send("vote created at "+snowflake(voteEmbed.timestamp))
    if(accessVoteFile[word]==undefined) { //this checks if the blacklisted word has been added
        message.channel.send({ephemeral: true, embeds: [voteEmbed], components: [yes, no]});
        //voteFileData[word]
        //accessFile = {}; 
        voteFileData[word] = {"name":word,"yes":[],"no":[]}//if not, add it
        fs.writeFileSync(votePath,JSON.stringify(voteFileData,null,2));
      }
      else if(accessVoteFile[word]!==undefined){
        message.channel.send("'"+word+"'"+" is a taken poll name");
      }else{
        message.channel.send("uhhhhh idrk what happened but this is not supposed to happen \n"+"error (accessVoteNameFile[word]): "+accessVoteFile[word] +"@84mb#1535");
      }
  }

  //closevote command
  if(message.content.startsWith(";closevote ")){
    if(hasMod==false){message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:");return};
    msg = message.content.toLowerCase();
    wordSplit = msg.split(";closevote ");
    word = wordSplit[1];
    console.log(word)
    voteId = accessVoteFile[word]
    console.log(voteId)
    if(accessVoteFile[word]==undefined){
      message.channel.send("There is no vote with the name '"+word+"'")
      return
    }
    if(voteId["closed"]==undefined){
      voteId["closed"] = "";
      fs.writeFileSync(votePath,JSON.stringify(voteFileData,null,2));
      message.channel.send("The vote '"+word+"' has now been closed");
      
    }else{
      message.channel.send("This vote has already been closed");
    }
    
  }

  if(message.content.startsWith(";voteremove")){
    message.channel.send("This feature is still in development, please wait until it is fully implemented")
    
  }
  if(message.content.startsWith(";votelist")){
    message.channel.send("This feature is still in development, please wait until it is fully implemented")
  }


  //voteresults command
  if(message.content.startsWith(";voteresults ")){
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
  }
    
  });




//button interaction or something, not sure how it works
client.on("interactionCreate", async (interaction) => {
  if(interaction.isButton()){

    id = interaction.customId;
    id = id.split(",");
    voteId1 = accessVoteFile[id[1]];
    console.log(voteId1)
    voteId2 = voteId1[id[0]]

    
    if(voteId1["closed"] !== undefined){
      message = await interaction.reply({ content: 'This vote has already ended :shrug:', ephemeral: true });
      return
    }
    let i = 0;
    
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
      fs.writeFileSync(votePath,JSON.stringify(voteFileData,null,2));
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

      
      //voteYes.split(interaction.user.tag)
      voteNo.push(interaction.user.tag)
      fs.writeFileSync(votePath,JSON.stringify(voteFileData,null,2));
      message = await interaction.reply({ content: 'Your vote has changed to no', ephemeral: true });


      return
    }else if(id[0]=="yes"){
      if(voteId1["yes"].includes(interaction.user.tag)){
        message = await interaction.reply({ content: 'Your vote is already yes', ephemeral: true });
        return; 
      }
      const index = voteNo.indexOf(interaction.user.tag);
      voteNo.splice(index, 1);
      
      //voteNo.split(interaction.user.tag)
      voteYes.push(interaction.user.tag)
      fs.writeFileSync(votePath,JSON.stringify(voteFileData,null,2));
      message = await interaction.reply({ content: 'Your vote has changed to yes', ephemeral: true });


      return
    }else{
    
      message = await interaction.reply({ content: 'You have already voted', ephemeral: true });
      
    }
    
    
  }

  
})

// 🥺
//👉👈
function voteClosed(name){
    voteId = accessVoteFile[word]
    if(voteId["closed"] == undefined){
      return false;
    }else{
      return true;
    }
}
