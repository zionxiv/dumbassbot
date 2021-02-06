module.exports = (client, reaction, user) => {
    if (reaction.partial) {
        try {
            reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }

    const reactionGuild = reaction.message.guild;
    const rolesCfg = client.config.roles.reaction;

    if(reaction.message.id === rolesCfg.colors.colorsMsgID) {
        if(!rolesCfg.colors[reaction.emoji.id]) return;
        const resolvedColorRole = reactionGuild.roles.cache.get(rolesCfg.colors[reaction.emoji.id]);
        reactionGuild.members.cache.get(user.id).roles.remove(resolvedColorRole);
    }

    if(reaction.message.id === rolesCfg.pronouns.pronounsMsgID) {
        if(!rolesCfg.pronouns[reaction.emoji.id]) return;
        const resolvedColorRole = reactionGuild.roles.cache.get(rolesCfg.pronouns[reaction.emoji.id]);
        reactionGuild.members.cache.get(user.id).roles.remove(resolvedColorRole);
    }
}