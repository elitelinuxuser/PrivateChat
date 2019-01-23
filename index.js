const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();

const trackUsers = [];
let privateChannel;
let categoryExists = false;

const setChannelPassword = (author, channel, password) => {
  return;
};

client.on("ready", () => {
  console.log(
    `Logged in as ${
      client.user.tag
    }! Use command !pchelp to get details about all the available commands.`
  );
  client.user
    .setActivity("Private Channels", { type: "WATCHING" })
    .then(presence => console.log(`Rich presense ${presence.status}`))
    .catch(console.error);
});

client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") {
    console.log("DM");
    var i;
    for (i = 0; i < trackUsers.length; i++) {
      author = trackUsers[i].authorAdded;
      channel = trackUsers[i].channel;
      if (msg.author === author) {
        password = msg.content;
        setChannelPassword(author, channel, password);
        return msg.author.send("Password set for the channel");
      }
    }
    return;
  }
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
    msg.author.send(
      "You have to set password for creating the channel. You can set the password by sending it as a reply to this message"
    );
    msg.guild.channels.map(category => {
      if (
        category.type === "category" &&
        category.name === "Private Channels"
      ) {
        privateChannel = category;
        categoryExists = true;
      }
    });
    if (!categoryExists) {
      msg.guild
        .createChannel("Private Channels", "category")
        .then(channel => {
          trackUsers.push({ authorAdded: msg.author, channel });
          privateChannel = channel;
          console.log("New category created!");
        })
        .catch(console.error);
    }

    joinedArgs = args.join(" ");
    msg.guild
      .createChannel(joinedArgs, "text")
      .then(channel => {
        channel.setParent(privateChannel);
        trackUsers.push({ authorAdded: msg.author, channel });
      })
      .catch(console.error);

    return msg.channel.send(
      `Channel created successfully! Set a password in the dm that bot sent you`
    );
  }
});

client.login(botconfig.token);
