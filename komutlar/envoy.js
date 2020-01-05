const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('#04B0F4')
.setTitle('Yumurta Avı')
.setURL('https://poligon.network')
.setAuthor('Poligon', client.user.avatarURL)
.setDescription('Rekabet pek sana göre değil mi? Yoksa seviyen mi düşük? Bunların hiçbiri önemli değil! Herkes için adil olan ve savaş becerisi gerektirmeyen bu etkinliğe katılarak ödülleri kapabilir, oyun keyfini artırabilirsin.')
.addField('**Nasıl Oynanır?**', 'Etkinlik vadi içerisinde yapılmaktadır. /warp vadi komutunu kullanarak vadiye gidebilirsiniz. Amaç vadideki yumurtaları olabildiğince hızlı bir şekilde rakiplerinizden önce açarak ödülleri kapmaktır.')
.addField('**Ödül Nedir?**', ':gift: Ödüller açtığınız yumurtalara göre değişkenlik göstermektedir. Normal bir ejder yumurtası açmak size sıradan ödüller kazandırırken nadir bulunan kutulardan açmak daha iyi ödüller kazandırabilir.')
.addField('**Etkinlik Tarihleri Nelerdir?**', ':clock630: Hergün saat 18.30da 15 kişi bulunduğunda başlar.')
.setImage('https://gamepedia.cursecdn.com/minecraft_gamepedia/0/0a/Ender_Dragon.gif?version=747d5fc9faed80f1aea57b0b234bcc85')
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
  name: 'envoy',
  description: 'Tüm komutları gösterir.',
  usage: 'envoy'
};