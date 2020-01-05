const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('#FF73FA')
.setTitle('Nitro Desteklemesi Hakkında Bilgilendirme')
.setURL('https://poligon.network')
.setAuthor('Poligon', client.user.avatarURL)
.setThumbnail('https://images-ext-1.discordapp.net/external/NB0d78e3P49K7J3wZN3UktyHdJwC-8t1vOgHXfV3hAE/https/i.hizliresim.com/RgvlYZ.png?width=393&height=589')
.setDescription('Discord Nitro paketine sahip misin? Harika! Nitro destekçileri için oluşturduğumuz harika fırsatlara katılabilirsin. Tek yapman gereken Boost hakkını sunucumuzda kullanmak. Gerisini biz hallederiz :)')
.addField('**Ne Kazanırsınız?**', 'Sadece 4.99$ ödeyerek Boost hakkınızı Discord sunucumuz için kullandığınız anda bizden aşağıdaki hediyeleri kazanırsınız!')
.addField(':gift: Mega Vip Plus', '30 Günlüktür, 2 Adet 6 Seviye Farm Itemi')
.addField(':gift: Nitro Destekçisi Rolü', 'Sınırsızdır, kanallara dosya ve bağlantı ekleyebilir, sesli kanallarda öncelikli konuşmacı olur ve premium müzik kanallarını kullanabilir.')
.addField('**Nasıl Yapılır?**', 'Sunucu ismimizin yanındaki seçenekler butonuna tıklayınız, ardından Server Boost seçeneğine tıklayınız. Boost işlemini yaptıktan sonra <#541639220406648833> kanalından bizlere ödeme bildiriminde bulunabilirsiniz.')
.setImage('https://media1.tenor.com/images/c1ee5ae3e9db6a5a3536f4232e946155/tenor.gif?itemid=14289229')
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
  name: 'nitro',
  description: 'Tüm komutları gösterir.',
  usage: 'nitro'
};