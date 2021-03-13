const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const board = require('./board.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(`Found file : ${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
console.log(`Done listing commands`);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	//console.log("Work to do !");
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return message.channel.send(`${message.author}`+' : Cette commande n\'existe pas.');
	
	//console.log(`Found asking for ${commandName}.`);
	if (command.args && !args.length) {
		let reply = `${message.author}`+' : Vous avez oublié de donner les arguments de votre commande !';
		if (command.usage) {
			reply += '\nL\'usage de cette commande est : '+`${config.prefix}${command.name} ${command.usage}`;
		}
		return message.channel.send(reply);
	}
	
	try {
		//console.log(`Running ${commandName}.`);
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('${message.author} :*Boum badaboum* inattendu sur la commande : ' + ${command.name});
	}

});
client.login(config.token);
