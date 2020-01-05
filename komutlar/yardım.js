const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Poligon Discord Komutları')
.setTimestamp()
.addField('» Sunucu Bilgileri:', 'IP: oyna.poligon.network | Sürüm: 1.14.4')
.addField('» /afk [sebep]', 'Afk kalmanızı sağlar.')
.addField('» /seviye', 'Seviyenizi gösterir.')
.addField('» /seviye [@kullanıcı]', 'Üyenin seviyesini gösterir.')
.addField('» /öneri [mesaj]', 'Tüm önerilerinizi #öneriler kanalına ulaştırır.')
.addField('» /help', 'Müzik botunun komutlarını gösterir.')
.setFooter('© 2019 Poligon', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};