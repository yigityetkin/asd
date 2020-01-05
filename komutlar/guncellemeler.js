const Discord = require('discord.js');
const db = require("quick.db");

exports.run = (client, message, args) => {
  
  var user = message.mentions.users.first() || message.author;
  var id = user.id
  var gid = message.guild.id;
  
    let guild = message.guild
    let duyurular = guild.channels.find('name', 'duyurular');
    if (!528649991695368202) return message.reply('`duyurular` kanalını bulamıyorum.');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Bir şey yazmadınız.');
    message.delete();
    client.channels.get(`639225626565541890`).send(`@everyone`);
    const embed = new Discord.RichEmbed()
    .setColor('ORANGE')
    .setTitle(`:tools: **Oyunda Yeni Bir Güncelleme Var!**`)
    .addField('**Güncellemeyi Yapan Kişi:**', user.tag)
    .addField('**Değişiklikler / Eklenenler:**', mesaj)
    .setThumbnail(user.avatarURL)
    .setFooter('© 2019 Poligon', client.user.avatarURL)
    return guild.channels.get(duyurular.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['güncelleme'],
  permLevel: 2
};

exports.help = {
  name: 'güncelleme',
  description: 'Sunucuda Duyuru yapmanızı sağlar.',
  usage: 'güncelleme [yazı]'
};