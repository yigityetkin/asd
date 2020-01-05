const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log("Ping received!");
  response.sendStatus(200);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("quick.db");
const Console = console;
var request = require('request');
const Giveaway = require("discord.js-giveaway")
const ms = require("ms");

require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

////////////////////////oto-cevap

client.on('message', message=> {
    if (message.channel.id == '613797461911273474') {
    if (message.isMentioned(client.users.get('256781179959640064'))) {
    message.reply('Discord sunucumuzda bizlere ulaşabilmek için lütfen <#541639220406648833> kanalını kullanarak destek talebi oluşturunuz. Destek talebi oluşturarak bizlerden yardım alabilir, ödeme bildirimi yapabilir veya herhangi bir konuda soru sorabilirsiniz. **İsmimizi etiketleyerek yaptığınız herhangi bir kanaldaki yardım çağrısı kâle alınmaz!**');
}
}
});

client.on('message', message=> {
    if (message.channel.id == '613797461911273474') {
    if (message.isMentioned(client.users.get('257245973300903936'))) {
    message.reply('Discord sunucumuzda bizlere ulaşabilmek için lütfen <#541639220406648833> kanalını kullanarak destek talebi oluşturunuz. Destek talebi oluşturarak bizlerden yardım alabilir, ödeme bildirimi yapabilir veya herhangi bir konuda soru sorabilirsiniz. **İsmimizi etiketleyerek yaptığınız herhangi bir kanaldaki yardım çağrısı kâle alınmaz!**');
}
}
});

////////////////////////yetkiler
  
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

////////////////////////destek-survival

client.on("message", (message) => {
     
        let kanal = "541639220406648833"

    if (message.channel.id !== kanal) return message.channel.send(``).then(msg => msg.delete(10000))
    if (message.channel.id == kanal) {
          message.delete();
    const reason = message.content.split(" ").slice(0).join(" ");
        
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) return message.channel.send(``);

  let kanal = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === '⏳ | Aktif Destek (Survival)');
  if (kanal) {
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Moderatör");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            ATTACH_FILES: true
        });


        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`Merhaba ${message.author.username}!`, `Yardım çağrınızı aldık. Destek ekibimiz en kısa zamanda sizinle ilgilenecektir. Dilerseniz destek mesajınıza ekleme yapabilir, bizlere ekran görüntüsü yollayabilirsiniz.\nSorun çözüldüğünde \`/destek-kapat\` yazabilirsiniz.`)
        .addField(`Konu:`,`${reason}`)
        .setFooter('© 2019 Poligon', client.user.avatarURL)
        .setTimestamp();
        c.send({ embed: embed });
           c.setParent(kanal)
    }).catch(console.error);
  } 
    }
});
client.on("message", (message) => {
if (message.content.toLowerCase().startsWith(prefix + `destek-kapat`)) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komutu destek kanalı dışında kullanamazsınız!`);

    message.channel.send(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`/onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '/onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });

  }
});


////////////////////////destek-faction

client.on("message", (message) => {
     
        let kanal = "663348084738228274"

    if (message.channel.id !== kanal) return message.channel.send(``).then(msg => msg.delete(10000))
    if (message.channel.id == kanal) {
          message.delete();
    const reason = message.content.split(" ").slice(0).join(" ");
        
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) return message.channel.send(``);

  let kanal = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === '⏳ | Aktif Destek (Faction)');
  if (kanal) {
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Moderatör");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            ATTACH_FILES: true
        });


        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`Merhaba ${message.author.username}!`, `Yardım çağrınızı aldık. Destek ekibimiz en kısa zamanda sizinle ilgilenecektir. Dilerseniz destek mesajınıza ekleme yapabilir, bizlere ekran görüntüsü yollayabilirsiniz.\nSorun çözüldüğünde \`/destek-kapat\` yazabilirsiniz.`)
        .addField(`Konu:`,`${reason}`)
        .setFooter('© 2019 Poligon', client.user.avatarURL)
        .setTimestamp();
        c.send({ embed: embed });
           c.setParent(kanal)
    }).catch(console.error);
  } 
    }
});
client.on("message", (message) => {
if (message.content.toLowerCase().startsWith(prefix + `destek-kapat`)) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komutu destek kanalı dışında kullanamazsınız!`);

    message.channel.send(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`/onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '/onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });

  }
});


////////////////////////rehber-basvuru

client.on("message", (message) => {
     
        let kanal = "541638263287578625"

    if (message.channel.id !== kanal) return message.channel.send(``).then(msg => msg.delete(10000))
    if (message.channel.id == kanal) {
          message.delete();
    const reason = message.content.split(" ").slice(0).join(" ");
        
    if (message.guild.channels.exists("name", "rehber-" + message.author.id)) return message.channel.send(``);

  let kanal = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === '⏳ | Aktif Başvuru Talebiniz');
  if (kanal) {
    message.guild.createChannel(`rehber-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Moderatör");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
        });


        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`Merhaba ${message.author.username}!`, `Başvuru talebinizi aldık! En kısa zamanda ekibimiz gönderdiğiniz taslağı inceleyecek. Başvuru talebinizi iptal etmek isterseniz /iptal yazınız.`)
        .addField(`Rehberlik Başvuru Taslağı:`,`${reason}`)
        .setFooter('© 2019 Poligon', client.user.avatarURL)
        .setTimestamp();
        c.send({ embed: embed });
           c.setParent(kanal)
    }).catch(console.error);
  } 
    }
});
client.on("message", (message) => {
if (message.content.toLowerCase().startsWith(prefix + `iptal`)) {
    if (!message.channel.name.startsWith(`rehber-`)) return message.channel.send(`Bu komutu başvuru kanalı dışında kullanamazsınız!`);

    message.channel.send(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`/onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '/onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });

  }
});

////////////////////////mimar-basvuru

client.on("message", (message) => {
     
        let kanal = "638752283651342337"

    if (message.channel.id !== kanal) return message.channel.send(``).then(msg => msg.delete(10000))
    if (message.channel.id == kanal) {
          message.delete();
    const reason = message.content.split(" ").slice(0).join(" ");
        
    if (message.guild.channels.exists("name", "mimar-" + message.author.id)) return message.channel.send(``);

  let kanal = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === '⏳ | Aktif Başvuru Talebiniz');
  if (kanal) {
    message.guild.createChannel(`mimar-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Moderatör");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
            ATTACH_FILES: true
        });


        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`Merhaba ${message.author.username}!`, `Başvuru talebinizi aldık! En kısa zamanda ekibimiz gönderdiğiniz taslağı inceleyecek. Başvuru talebinizi iptal etmek isterseniz /iptal yazınız.`)
        .addField(`Mimarlık Başvuru Taslağı:`,`${reason}`)
        .setFooter('© 2019 Poligon', client.user.avatarURL)
        .setTimestamp();
        c.send({ embed: embed });
           c.setParent(kanal)
    }).catch(console.error);
  } 
    }
});
client.on("message", (message) => {
if (message.content.toLowerCase().startsWith(prefix + `iptal`)) {
    if (!message.channel.name.startsWith(`mimar-`)) return message.channel.send(`Bu komutu başvuru kanalı dışında kullanamazsınız!`);

    message.channel.send(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`/onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '/onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });

  }
});

////////////////////////sosyal-basvuru

client.on("message", (message) => {
     
        let kanal = "616201281400209408"

    if (message.channel.id !== kanal) return message.channel.send(``).then(msg => msg.delete(10000))
    if (message.channel.id == kanal) {
          message.delete();
    const reason = message.content.split(" ").slice(0).join(" ");
        
    if (message.guild.channels.exists("name", "sosyal-" + message.author.id)) return message.channel.send(``);

  let kanal = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === '⏳ | Aktif Başvuru Talebiniz');
  if (kanal) {
    message.guild.createChannel(`sosyal-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Moderatör");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true,
        });


        const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`Merhaba ${message.author.username}!`, `Başvuru talebinizi aldık! En kısa zamanda ekibimiz gönderdiğiniz taslağı inceleyecek. Başvuru talebinizi iptal etmek isterseniz /iptal yazınız.`)
        .addField(`Sosyal Medya Başvuru Taslağı:`,`${reason}`)
        .setFooter('© 2019 Poligon', client.user.avatarURL)
        .setTimestamp();
        c.send({ embed: embed });
           c.setParent(kanal)
    }).catch(console.error);
  } 
    }
});
client.on("message", (message) => {
if (message.content.toLowerCase().startsWith(prefix + `iptal`)) {
    if (!message.channel.name.startsWith(`sosyal-`)) return message.channel.send(`Bu komutu başvuru kanalı dışında kullanamazsınız!`);

    message.channel.send(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`/onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '/onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });

  }
});

////////////////////////yeni-üyeler

client.on('guildMemberAdd', member => {
  const GirişKanalı = member.guild.channels.find('name', 'gelen-giden');
  if (!GirişKanalı) return;
  const GirişMesaj = new Discord.RichEmbed()
  .setColor('GREEN')
  .setAuthor(member.user.username)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 | Aramıza yeni katıldı. Hoşgeldin!')
  .setTimestamp()
  GirişKanalı.sendEmbed(GirişMesaj);
  member.send("Selam Oyuncu,\nLütfen #hoşgeldin ve #kurallar sayfalarını okumayı ihmal etme. Sözleşmemiz ve kurallarımız herkes için daha iyi bir sunucu olmamız için var. Sunucumuz hakkında aklında soru işaretleri varsa çekinmeden destek talebi açabilirsin.\nİyi eğlenceler :thumbsup:")
});

client.on('guildMemberRemove', member => {
  const ÇıkışKanalı = member.guild.channels.find('name', 'gelen-giden');
  if (!ÇıkışKanalı) return;
  const ÇıkışMesaj = new Discord.RichEmbed()
  .setColor('RED')
  .setAuthor(member.user.username)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Sunucuyu terk etti. Güle güle.')
  .setTimestamp()
  ÇıkışKanalı.sendEmbed(ÇıkışMesaj); 
});

////////////////////////seviyeler


client.on("message", async message => {
  
  if(message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  
  var id = message.author.id;
  var gid = message.guild.id;
  
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);
  
  
  if(!lvl) {
    
    db.set(`xp_${id}_${gid}`, 5);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
    
  } else {
    
    var random = Math.random() * (8 - 3) + 3;
    db.add(`xp_${id}_${gid}`, random.toFixed());
    console.log(xp);
    
    if(xp > xpToLvl) {
      
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(`xpToLvl_${id}_${gid}`, await db.fetch(`lvl_${id}_${gid}`) * 100);
      var lvl = await db.fetch(`lvl_${id}_${gid}`);
      message.channel.send("Tebrikler, " + message.author + ". Seviye atladın! Yeni seviyen: **" + lvl + "**");
      var role = message.guild.roles.get(await db.fetch(`role_${gid}_${lvl}seviye`));
      if(!role) return;
      else {
        message.member.addRole(role);
        message.channel.send("Tebrikler! **" + lvl + "** seviye olarak @" + role.name + " rolünü kazandınız.");
      }
      
    }
    
  }
  
  
  
});

////////////////////////stats

let options = {
    total: "616007023829450824",
}; //Options for bot to work
// bot need permissions to work btw.
client.on("ready", () => {

    if (client.guilds.size < 1) {
        Console.log("The bot is not in any guild.");
        process.exit(0);
        return;
    } //Shutdowns, if bot is not in any guild
    const text = `
______________________________
${client.guilds.first().name}
Toplam Üye: ${client.guilds.first().memberCount}
______________________________
`; //The text that displays to console, when client is ready.
    Console.log(text);
});
client.on("guildMemberAdd", (member) => {
        //All choices are optional here. Bot wont work if the channel ID's are wrong. How to properly get ID's read in README.md 
        try {
            member.guild.channels.get(options.total).setName(`Toplam Üyemiz • ${member.guild.memberCount}`); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
        
        }
        catch (e) {
        Console.log(e);
        }
  });
client.on("guildMemberRemove", (member) => {
        //All choices are optional here. Bot wont work if the channel ID's are wrong. How to properly get ID's read in README.md 
        try {
            member.guild.channels.get(options.total).setName(`Toplam Üyemiz • ${member.guild.memberCount}`); // You can change this text, but still keep ${guild.memberCount}, as it defines total members.
        
        }
        catch (e) {
        Console.log(e);
        }
});
client.login("NjE1Mjc4NjkyNDMxNTYwNzY3.XWWTsA.zDtGWotrSBj2oJ7TAeMvnvkbW98");

/////////////////////////////sunucudurum

client.on('ready', () => {
  
    var interval = setInterval (function () {
        var channel = client.channels.find(c => c.id === "626105144001560576")
        request(`https://mcapi.xdefcon.com/server/148.251.169.26/full/json`, function (error, response, body) {
            body = JSON.parse(body);
            if(body.serverStatus === "online"){
                channel.setName(`Çevrimiçi Oyuncu • ${body.players}`);
            } else {
                channel.setName("Sunucu Çevrimdışı");
            }
        })
    }, 2 * 1500);

})

/////////////////////////////
 
client.on('message',async message => {
const moment = require('moment');
const ms = require('ms') //npm i ms
    var prefix = '/' //Bot Prefix !
  var time = moment().format('Do MMMM YYYY , hh:mm');
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "Sabah";
if (hours >= 12) {
suffix = "Öğleden Sonra";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
 
  var filter = m => m.author.id === message.author.id;
  if(message.content.startsWith(prefix + "çekiliş")) {
 
    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send('Çekiliş yapmak için yetkiniz bulunmuyor!');
    message.channel.send(`Çekilişin yapılacağı kanalın ismini sohbete yazınız.`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name' , collected.first().content);
        if(!room) return message.channel.send('Hata');
        room = collected.first().content;
        collected.first().delete();
        msg.edit('Çekilişin ne kadar süreceğini sohbete yazın. (1m, 1d, 1h gibi)').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('Desteklenmeyen bir süre yazdınız. Lütfen çekilişi baştan ayarlayın.');
            duration = collected.first().content
            collected.first().delete();
            msg.edit('Son olarak çekilişin konusunu (hediyesini) yazınız.').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                  .setTitle('🎉 Yeni Bir Çekiliş Başladı 🎉')
                  .setDescription(`\nÇekilişe katılabilmek için (🎉) ifadesine tıklayın! İfadeyi geri çekmeniz çekilişten otomatik olarak elenmenize sebep olur. \n\n**Ödül:** ${title} \n**Süre:** ${duration} \n**Başladığı Zaman:** ${suffix} ${hours}:${minutes}`)
                  .setImage('https://webstockreview.net/images/clipart-present-animation-7.gif')
                  .setFooter('© 2019 Poligon Network', client.user.avatarURL)
                  message.guild.channels.find("name" , room).send('@everyone' , {embed: giveEmbed}).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users
                       let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                       let endEmbed = new Discord.RichEmbed()
                       .setTitle('🎉 Sona Eren Çekiliş 🎉')
                       .addField('Bu çekiliş sona ermiştir! Detaylar aşağıda verilmiştir. Kazanan kişi destek talebi oluşturarak hediyesini talep edebilir.',`**Kazanan:** ${gFilter} \n**Ödül:** ${title}`)
                       .setTimestamp()
                       .setFooter('© 2019 Poligon Network', client.user.avatarURL)
                     m.edit({embed: endEmbed})
                     message.guild.channels.find("name" , 'duyurular').send(`@everyone ${title} çekilişi sona erdi! Sonucu görebilmek için <#641223048560640000> kanalını ziyaret edebilirsiniz.`)
                }, ms(duration));
            });
                } catch(e) {
                message.channel.send(`:heavy_multiplication_x:| **i Don't Have Prem**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  }
});
