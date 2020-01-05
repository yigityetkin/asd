//CREATED BY  KEYTRR

const Discord = require('discord.js');


module.exports.run = async (Octopus, message, args) => {
  if (args == 0) return message.channel.send("Lütfen Oylama Konusunu Belirtin.")

  let embed = new Discord.RichEmbed()
  .setTitle(`${args}`.split(',').join(' '))
  .setColor("#ffff00");

  return message.channel.send(embed).then(message.delete())

  .then(function (message, str) {
       message.react("✅")
       message.react("⛔")
     }).catch(function() {
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ ],
  permLevel: 4
};

exports.help = {
  name: 'oylama'
};