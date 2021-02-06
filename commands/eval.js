exports.run = (client, message, args) => {
    if(!message.author.id === "150811536976248832") return;

    try {
        const code = args.join(" ");
        let evaled = eval(code);
 
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
 
        message.channel.send(client.clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
    }
};