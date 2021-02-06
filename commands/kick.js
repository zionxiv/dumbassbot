exports.run = (client, message, args) => {
    const messageMention = message.mentions.members;
    const reason = args.slice(1).join(" ");

    if (!message.member.hasPermission("KICK_MEMBERS")) 
        return message.reply("you don't have sufficient permissions to use this command.")
  
    if (messageMention.size === 0) 
        return message.reply("please mention a user to kick");
  
    const kickMember = messageMention.first();
  
    kickMember.kick(reason).then(m => {
        message.reply(`${m.user.username} was succesfully kicked.`);
    });
  };