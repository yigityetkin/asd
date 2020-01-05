const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!geçicisustur@üye 1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Doğru Kullanım: +mute <oyuncu> <süre>");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Hata: Geçici olarak susturmaya çalıştığınız kişi yetkili veya bot'un yetkisi belirttiğiniz kişiyi geçici olarak susturmaya yetmiyor!");
let muterole = message.guild.roles.find(r => r.name === "Susturulmuş");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Susturulmuş",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Doğru Kullanım: /mute <@oyuncu> <süre>");
  message.delete();

  await(tomute.addRole(muterole.id));
  const embed = new Discord.RichEmbed()
  message.channel.send(`<@${tomute.id}>, kural ihlali nedeniyle ${ms(ms(mutetime))} susturuldu.`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> artık konuşabilir.`);
  }, ms(mutetime));



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sustur', 'mute'],
  permLevel: 2
};

exports.help = {
  name: 'sustur',
  description: 'Sureli Susturur.',
  usage: 'sustur [Kullanıcı] [Süre]'
};