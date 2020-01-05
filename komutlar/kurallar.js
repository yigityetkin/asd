const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('ORANGE')
.setTitle('Discord Kurallarımız')
.setURL('https://poligon.network')
.setAuthor('Poligon', client.user.avatarURL)
.setThumbnail('https://www.freepnglogos.com/uploads/discord-logo-png/seven-kingdoms-9.png')
.setDescription('Burada Discord sunucumuzda yapılmasını hoş karşılamadığımız birkaç kuraldan bahsedeceğiz.')
.addField('Kırıcı Olma', 'Bir kimseye onur, şeref ve saygınlığını rencide edebilecek nitelikte yakıştırmalarda bulunma.')
.addField('Hoşgörülü Ol', 'Siyasi, dini görüşlere hakaret etme ve aşağılayıcı kelimeler sarf etme.')
.addField('Rahatsızlık Verme', 'Sohbetin akışını sabote edecek şekilde davranışlardan kaçın (spam/flood)')
.addField('Reklam Yapma', 'Poligon Minecraft sunucusu, Poligon Discord sunucusu dışındaki her türlü ip, davet linki paylaşımından kaçın.')
.addField('Saygılı Ol', 'Sesli sohbet odalarında yüksek sesle konuşmak, rahatsızlık verecek davranışlarda bulunmak (Troll), küfür etmek, kavga etmek ceza sebebidir. Odalara durmadan girip çıkmak da dahil.')
.addField('Destek değil, Dost iste :)', 'Sohbet odalarından oyun içi destek istememelisin. Destek almak için <#541639220406648833> kanalını kullanmalısın.')
.addField('Odaları Düzenli Kullan', 'Sohbet kanallarını amacı dışında kullanma, her odanın bir açılma amacı var :)')
.addField('Link Paylaşımı Yapma', 'Sohbet kanallarında Link paylaşmak yasak. Link paylaşımlarını çok sevmeyiz, o yüzden yapma.')
.addField('Etiketlediğin Rollere Dikkat Et', 'Yetkilileri ve özel misafirleri etiketleme. Kimse sağdan çıkan aralıksız bildirimleri sevmez.')
.setFooter('© 2019 Poligon')
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 2
};

exports.help = {
  name: 'kurallar',
  description: 'Tüm komutları gösterir.',
  usage: 'kurallar'
};