const Discord = require("discord.js");

const { MessageEmbed } = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

process.setMaxListeners(0);


let fs = require('fs'); //importing file save
let blacklistedPath = "blacklistedWords.json";
let fileRead = fs.readFileSync(blacklistedPath);
let accessJsonFile = JSON.parse(fileRead);
let accessFile = accessJsonFile["blacklists"];
console.log(accessFile)
//const client = new Discord.Client();
let prefix = ";";

client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix+"code")){return;}
    let tag = message.member.user.id;
    console.log(";code command");
    message.channel.send(" Hey <@"+tag+">! \n \n I am a discord bot coded by 84mb#1535. I am made for Tritho's discord server! \n \n You can access my code on GitHub, just search up 84mb and you should see! (I can't send links here)");
  if(message.channel.id == "963338198824652840"){
    message.channel.bulkDelete(1);
  }
});

client.on("messageCreate", message =>{
  if(!message.content.startsWith(prefix+"setblacklist")){return;}
  const msg = message.content;
  const wordSplit = msg.split(";setblacklist ");
  const word = wordSplit[1];

  if (!accessFile[word]) { //this checks if the blacklisted word has been added
        accessFile[word] = {}; //if not, add it
        fs.writeFileSync(blacklistedPath, JSON.stringify(accessFile,null,2));
        message.channel.send("New word added - "+word);
    }
});


client.on("messageCreate", message =>{
    //i know i can combine these if statements but we dont like efficiency here
    if(message.channel.id == "963338198824652840"){
      const word = message.content.toLowerCase();
      let blacklistedWord = accessFile.indexOf(word);
      console.log("word is "+word)
      console.log("accessfile[word] = "+blacklistedWord);
      if(message.content.indexOf(" ")!==-1){
        message.channel.bulkDelete(1);
      }else if(blacklistedWord!==-1){
        message.channel.bulkDelete(1);
        
      }
    }
});

//asked to be added by XshootakillL
client.on("messageCreate", message =>{
  if(!message.author.bot){
    if(message.content.startsWith(prefix+"shoota")){
      message.channel.send("mooooo! :cow:");
    }
  }
});
