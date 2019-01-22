const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(
    `Logged in as ${
      client.user.tag
    }! Use command !pchelp to get details about all the available commands.`
  );
  client.user.setGame("Testing bot");
});

client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  const prefix = botconfig.prefix;
  const messageArray = msg.content.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  if (cmd === `${prefix}pchelp`) {
    const botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#15f153")
      .addField("Bot Name:", client.user.username);
    return msg.channel.send(botembed);
  }

  if (cmd === `${prefix}pccreate`) {
    console.log(args);
    msg.guild.createChannel(args[0], "text", [{type: }]);
    return msg.channel.send(
      `Channel created successfully! Set a password in the dm that bot sent you`
    );
  }
});

client.login(botconfig.token);
