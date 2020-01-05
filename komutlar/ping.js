const Discord = require('discord.js');


exports.run = function(client, message) {

    message.channel.send("Pingim **" + client.ping + "** ms!");
};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['p'],
  permLevel: 3
};

exports.help = {
  name: 'ping', 
  description: 'Botun pingini gösterir',
  usage: 'ping'
};