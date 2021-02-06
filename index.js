const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.config = require("./config.json");


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;

        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Attempting to load event ${eventName}`);


        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;

        let props = require(`./commands/${file}`);

        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);

        client.commands.set(commandName, props);
    });
});

// funky client clean for eval command and removing everyone mentions when the bot says shit
client.clean = (text) => {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
};

client.login(client.config.token);