exports.run = (client, message, args) => {
    const messageMention = message.mentions.members;
    const resolvable = args[0];
    const reason = args.slice(1).join(" ");

    if (!message.member.hasPermission("BAN_MEMBERS")) 
        return message.reply("you don't have sufficient permissions to use this command.");
    if (!resolvable) 
        return message.reply("please provide a user resolvable to ban (ex: id, mention, name).");
    if(messageMention.size === 0 && resolvable.length !== 18 && !parseInt(resolvable))
        return message.reply("please provide a valid user or user resolvable.");

    const banMember = messageMention.size ? messageMention.first() : resolvable;
  
    try {
        message.guild.members.ban(banMember, {reason}).then(m => {
            message.reply(`${m.user.username} was successfully banned.`);
        });
    } catch (err) {
        console.error(err);
        return message.reply("there was an issue banning the specified user.")
    }
};