const Discord = require('discord.js');


exports.run = function(client, message, args) {
  
	var öneri = args.slice(0).join(' ');
	var guildID = "488814770527535134";
	var channelID = "615663502371192947";
	
	if (!öneri){
		message.delete(1)
		return message.reply("Bir mesaj belirtin! Doğru kullanım: **/öneri <mesaj>**")
		.then(msg => {
          msg.delete(3000)
           });
	} else {
		
		var embed = new Discord.RichEmbed()
			.setTimestamp()
			.addField("Kullanıcı:", message.author.tag)
			.addField("Öneri:", öneri)
     		
		client.guilds.get(guildID).channels.get(channelID).send(embed);
		message.delete(1)
		message.reply("Öneriniz alınmıştır! Teşekkür ederiz.")
		.then(msg => {
          msg.delete(3000)
           });
	};

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["öner"], 
  permLevel: 0 
};

exports.help = {
  name: 'öneri', 
  description: "Minecraft ve Discord sunucumuz hakkındaki önerilerinizi #öneriler kanalına ulaştırır", 
  usage: 'öneri <mesaj>' 
};