exports.run = (client, message, args) => {
    if(!message.author.id === "150811536976248832") return;

    if(!args || args.length < 1) 
        return message.reply("you must provide a command name to reload.");

    const commandName = args[0];

    if(!client.commands.has(commandName)) 
        return message.reply("that command does not exist");

    // deleting the cache of the loaded command file.
    delete require.cache[require.resolve(`./${commandName}.js`)];

    // removing the current definition of the command from the Discord Collection.
    client.commands.delete(commandName);

    // requiring the new version of the command.
    const props = require(`./${commandName}.js`);

    // adding the new version of the command to the Discord Collection.
    client.commands.set(commandName, props);

    message.reply(`the command ${commandName} has been reloaded.`);
};