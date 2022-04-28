//this is v1 (without blacklists)

const Discord = require("discord.js");

const { MessageEmbed } = require('discord.js');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

process.setMaxListeners(0);

//const client = new Discord.Client();
let prefix = ";";

client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix+"code")){return;}
    let tag = message.member.user.id;
    console.log(";code command");
    message.channel.send(" Hey <@"+tag+">! \n \n I am a discord bot coded by 84mb#1535. I am made for Tritho's discord server! \n \n You can access my code on GitHub, just search up 84mb and you should see! (I can't send links here)");
});

client.on("messageCreate", message =>{
    //i know i can combine these if statements but we dont like efficiency here
    if(message.channel.id == "insert channel id here"){
      if(message.content.indexOf(" ")!==-1){
        message.channel.bulkDelete(1);
       }
    }
});

client.login("has been removed for obvious reasons")
