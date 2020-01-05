const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('ORANGE')
.setTitle('Poligon Discord Sunucusuna Hoşgeldin!')
.setURL('https://poligon.network')
.setAuthor('Poligon', client.user.avatarURL)
.setThumbnail('https://i.hizliresim.com/r046Az.png')
.setDescription('Discord sunucumuz üzerinden diğer üyelerle iletişim haline geçebilir, sunucumuzdaki serüveninde onlarla müttefik olabilirsin. Bu Discord sunucusunun düzenini sağlamak adına, uyman gereken bazı önemli <#614023767361847318> var. Bu kuralların dışına çıkmadığın sürece bizim aramızda her zaman bir yerin olacaktır.')
.addField(':pushpin: **Minecraft Sunucu Bilgilerimiz**', 'Ip Adresi: mc.poligon.network | Sürüm: 1.14.4')
.addField(':pushpin: **Web Sitemiz**', '[Gitmek İçin Tıkla!](https://poligon.network/)')
.addField(':pushpin: **Market**', '[Gitmek İçin Tıkla!](https://poligon.network/market)')
.addField(':pushpin: **Oyun Kuralları**', '[Gitmek İçin Tıkla!](https://poligon.network/kurallar)')
.addField(':pushpin: **Cezalar**', '[Gitmek İçin Tıkla!](https://poligon.network/cezalar)')
.addField(':pushpin: **Nasıl Girilir?**', '[Gitmek İçin Tıkla!](https://poligon.network/nasil-girilir/)')
.setImage('https://poligon.network/wp-content/uploads/2019/10/giris.jpg')
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
  name: 'bilgi',
  description: 'Tüm komutları gösterir.',
  usage: 'bilgi'
};