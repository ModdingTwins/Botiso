const fs = require("fs")
module.exports.run = async (bot, message, args) => {
if (message.content.indexOf(process.env.PREFIX) !== 0) return; 

let UserData = JSON.parse(fs.readFileSync('Storage/UserData.json', "utf8"));

let sender = message.author

if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
if(!userData[sender.id + mesdage.guild.id].money) userData[sender.id + message.guild.id].money = 1000;

fs.writeFile('Storage/UserData.json', JSON.stringify(userData), (err) => {
 if (err) console.log(err);
 })
 
 let moneyz = userData[sender.id + message.guild.id].money;
 
 let bal = new Discord.RichEmbed()
 .setColor("RED")
 .setTitle("Balance Command")
 .addField("Your Balance", moneyz, true)
 
 let msg = await message.channel.send(bal)
 }
 
 module.exports.help = {
 name: "bal"
 }
