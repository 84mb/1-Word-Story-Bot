//declaring and importing
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
process.setMaxListeners(0);

//also delcaring and importing
let fs = require('fs'); //importing file save
let blacklistedPath = "blacklistedWords.json";
let fileRead = fs.readFileSync(blacklistedPath);
let accessJsonFile = JSON.parse(fileRead);
//let accessFile = accessJsonFile["blacklists"];
let accessFile = accessJsonFile;
console.log("accessfile = "+accessFile);
console.log("accessfile[ez] = "+accessFile.indexOf("ez"));
//const client = new Discord.Client();
let prefix = ";";
client.once('ready', ()=>{
    console.log("Bot is Online!");
    client.channels.cache.get("952435253547499523").send("<@479551871128961026> i am online")
});
let fileData = accessFile;

const mySecret = process.env['TOKEN']
client.login(mySecret);


function checkModStatus(){
  switch(hasMod){
    case false:
    break;
    case true:
    return;
  }
}
//Functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function error(){
  message.channel.send("<@84mb#1535> i am going offline... something happen :pensive:");
}





//Functions in js
try{
  client.on("messageCreate", message =>{
    let msg;
    let wordSplit;
    let storyChannel = "963338198824652840";
    let word = message.content.toLowerCase();
    tag = message.author.id;
    let blacklistedWord = toString(accessFile.indexOf(word));
    if(message.author.bot){return}
    
    let hasMod=false;
    
    if(message.member.roles.cache.has('860411322810630155')){
      hasMod=true;
    }
    if(message.member.roles.cache.has('860764680750497803')){
      hasMod=true;
    }
    if(message.member.roles.cache.has('962968576434769991')){
      hasMod=true;
    }
    
  
      
    //sending discord bot code and brief information about the bot 
    if(message.content.startsWith(prefix+"code")){
      let tag = message.member.user.id;
      console.log(";code command");
      message.channel.send(" Hey <@"+tag+">! \n \n I am a discord bot coded by 84mb#1535. I am made for Tritho's discord server! \n \n You can access my code on GitHub, just search up 84mb and you should see! (I can't send links here)");
      if(message.channel.id == storyChannel){
        message.channel.bulkDelete(1);
      }
    }
  
  
      
  
  if(message.content.startsWith(prefix+"blacklist ")){
    if(hasMod==false){
      message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
      return;
    }else{
       msg = message.content.toLowerCase();
       wordSplit = msg.split(";blacklist ");
      word = wordSplit[1];
      console.log("accessFile[word] "+accessFile[word]);
      
      if(accessFile.indexOf(word)==-1) { //this checks if the blacklisted word has been added
        console.log(fileData)
        fileData.push(word)//if not, add it
        console.log(fileData)
        //accessFile = {}; 
        fs.writeFileSync(blacklistedPath,JSON.stringify(fileData,null,2));
        message.channel.send("New word added - "+word);
      }
      else if(accessFile.indexOf(word)!==-1){
        message.channel.send("'"+word+"'"+" already on the list :rofl:");
        console.log("word already on list is - "+"'"+word+"'")
      }else{
        message.channel.send("uhhhhh idrk what happened but this is not supposed to happen \n"+"error (accessFile[word]): "+accessFile[word]);
      }
      //we dont like efficiency here
    }
  }
  if(message.content.startsWith(prefix+"unblacklist ")){
    if(hasMod==false){
      message.reply("you dont have mod LOL :rofl: :joy: :rofl: :rofl: :joy:")
      return;
    }else{
      msg = message.content.toLowerCase();
      wordSplit = msg.split(";unblacklist ");
      word = wordSplit[1];
      console.log("accessFile[word] "+accessFile[word]);
      console.log(blacklistedWord);//typeof objectToBeTested != "undefined")
        console.log("word is "+word)
      if (blacklistedWord !== "-1") { //this checks if the blacklisted word is in the list
        fileData.splice((", "+word),1)//if not, add it
        console.log("word is "+word)
        console.log(fileData.splice((", "+word),1));
        fileData.join("");
        console.log(fileData)
        //accessFile = {}; 
        fs.writeFileSync(blacklistedPath,JSON.stringify(fileData,null,2));
        message.channel.send("word removed - "+word);
      }
      else{
        message.channel.send("'"+word+"'"+" isn't on the blacklisted list :rofl:");
      }
      //we dont like efficiency here
    }
  }
  if(message.channel.id == storyChannel){
      console.log(word)
      if(message.content.indexOf(" ")!==-1){
        if(hasMod==true){
          message.channel.send("Woah there <@"+tag+">! That phrase has a space in it but I'll let it slide.....")
          .then(msg => {
    setTimeout(() => msg.delete(), 5000)
  })
        }else{
        message.channel.bulkDelete(1);
        }
      }else if(accessFile.indexOf(word)!==-1){
        if(hasMod==true){
          message.channel.send("Woah there <@"+tag+">! That word is blacklisted but I'll let it slide.....")
          .then(msg => {
    setTimeout(() => msg.delete(), 5000)
  })
          
        }else{
        message.channel.bulkDelete(1);
        }
      }
  }
  if(message.content.startsWith(prefix+"maxitbroken")){
    message.channel.send("<@479551871128961026>"+" the bot is broken again :( \n you're a bad dev!!!1!!1111!!11111!!!111 :rage:");
  }


    
  if(message.content==prefix+"blacklistlist"){
    if(accessFile[0]==undefined){
      message.channel.send("Add a word to the blacklist list by typing the command ';blacklist' followed by the word you want to blacklist");
    }else{
      message.channel.send(accessFile.join(", "));
    }
  }

  if(message.content.startsWith(prefix+"help")){
    const exampleEmbed = new MessageEmbed()
          .setColor('#df62e3')
          .setTitle('Help')
          .setAuthor({ name: "One Word Story Bot", iconURL: "https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png"})
          .setDescription('List of commands below: \n')
          .setThumbnail('https://images.emojiterra.com/twitter/v13.1/512px/1f4d6.png')
          .addFields(
              { name: ';blacklistlist', value: "Shows the list of blacklisted words"+"\n"},
              { name: ';code', value: "Sends a link to the github page"+"\n"},
              { name: ";generaterobux", value: "randomly generates between 1000 and 10000 robux"+"\n"},
              { name: ';blacklist (only for moderators and admins) ', value: "adds words to the blacklisted list"+"\n"},
              { name: ';unblacklist (only for moderators and admins) ', value: "removes words from the blacklisted list"+"\n"}
              
              )
          .setTimestamp()
          .setFooter({ text: 'If you see this say ";isawit" in the bot-commands channel'});
  
      message.channel.send({ embeds: [exampleEmbed] });
  }  
    if(message.content==prefix+"mod"){
      if(hasMod==true){
        message.channel.send("respect, you have mod")
      }else{
        message.channel.send("imagine not having mod")
      }
    }
  
    if(message.content.startsWith(prefix+"generaterobux")){
        const freeRobuxMsg = message.channel.send("Generating Free Robux - initiating...").then(robux => {
          sleep(5000);
        for(let j = 0;j<1001;j++){
          if(j/100==Math.round(j/100)){
          robux.edit("Generating Free Robux - "+j/10+"%")
          sleep(Math.floor(Math.random()+1000 * 10000));          
          }
         }
          sleep(2000);
          robux.edit("You have received "+Math.floor(Math.random() * 10000)+" Robux!");
  
          
        } );      
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
  });
}
catch(err){
  error();
}
