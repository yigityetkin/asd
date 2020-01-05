const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('#04B0F4')
.setTitle('KOTH')
.setURL('https://poligon.network')
.setAuthor('Poligon', client.user.avatarURL)
.setDescription('Savaş becerilerine ve oyun seviyene güveniyor musun? Harika! Bu etkinlik tam sana göre! Koth etkinliğine katılarak stratejini konuşturabilir ve ödülü kapabilirsin.')
.addField('**Nasıl Oynanır?**', 'Etkinlik arena içerisinde yapılmaktadır. /warp arena komutunu kullanarak arenaya gidebilirsiniz. Arenanın tam ortasından bulunanan kırmızı Koth alanında 6 dakika boyunca durabilen etkinliğin kazananı olur.')
.addField('**Ödül Nedir?**', ':gift: Koth Kasası Anahtarı x1')
.addField('**Etkinlik Tarihleri Nelerdir?**', ':clock830: Hergün saat 19.30da 20 kişi bulunduğunda başlar.')
.setImage('https://i.gifer.com/Vg7.gif')
.setFooter('© 2019 Poligon Network')
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 2
};

exports.help = {
  name: 'koth',
  description: 'Tüm komutları gösterir.',
  usage: 'koth'
};