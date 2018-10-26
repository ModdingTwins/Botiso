const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});

//COMMAND HANDLER------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});
//BOT LOGIN AREA AND SETACTIVITY------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("ready", () => {
  console.log(`${bot.user.username} is online`)
  
  bot.user.setActivity("Say Command Added", {type: "Playing"})
});

bot.login(process.env.BOT_TOKEN)


//WELCOME AND LEAVE------------------------------------------------------------------------------------------

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', "welcome-leave");
  if (!channel) return;
	let memberEmbed = new Discord.RichEmbed()
	.setColor('#a193ff')
  .setTitle(`PandazBot™ Welcome Message`)
	.setDescription(`Welcome To ${member.guild.name}`)
  .addField(`${member.user.username} Has Joined!!`, `We Now Have ${member.guild.memberCount} Members`, true)
	.setFooter(`ID - ${member.id}`, `${member.user.avatarUReL}`)
	.setTimestamp()
  .setThumbnail(`${member.user.avatarURL}`)
  
  channel.send(memberEmbed);
});

 bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', "welcome-leave");
  if (!channel) return;
	let memberEmbed2 = new Discord.RichEmbed()
	.setColor('#66545e')
  .setTitle("PandazBot™ Leave Message")
	.setDescription(`Well... We Lost A Member In ${member.guild.name}`)
  .addField(`${member.user.username} Has Left!!`, `We Now Have ${member.guild.memberCount} Members`, true)
	.setFooter(`ID - ${member.id}`)
	.setTimestamp()
  .setThumbnail(`${member.user.avatarURL}`)


  channel.send(memberEmbed2);
});