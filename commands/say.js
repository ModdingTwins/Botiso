const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
if
(message.content.indexOf(process.env.PREFIX) !== 0) return;

      if(!message.member.hasPermission("SEND_MESSAGES")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);

}

module.exports.help = {
  name: "say"
}
