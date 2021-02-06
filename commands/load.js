exports.run = (client, message, args) => {
    const commandName = args[0];
    
    if(!message.author.id === "150811536976248832") 
        return;

    if(!args || args.length < 1) 
        return message.reply("you must provide a command name to load.");

    if(client.commands.has(commandName)) 
        return message.reply("that command is already loaded.");

    // removing the current definition of the command from the Discord Collection.
    client.commands.delete(commandName);

    // requiring the new version of the command.
    const props = require(`./${commandName}.js`);

    // adding the new version of the command to the Discord Collection.
    client.commands.set(commandName, props);

    message.reply(`the command ${commandName} has been loaded.`);
};