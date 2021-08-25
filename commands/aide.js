const { prefix } = require('../config.json');

module.exports = {
	name: 'aide',
	description: 'Liste les commandes disponibles ou fournit des informations sur une commande en argument.',
	aliases: ['help','commands'],
	usage: '[nom de la commande]',
	user: 'PJ',
	cooldown: 2,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('\n``` Voici la liste des commandes disponibles pour les PJ et leurs alias :```');
			data.push(commands.map(function(command){ if( command.user == 'PJ' ) { return command.name+" : "+command.aliases+"\n"+"** -> "+command.description+"**\n"; } }).join(''));
			data.push('\n``` Voici la liste des commandes disponibles pour les MJ et leurs alias :```');
			data.push(commands.map(function(command){ if( command.user == 'MJ' ) { return command.name+" : "+command.aliases+"\n"+"** -> "+command.description+"**\n"; } }).join(''));
			data.push('\n```Vous pouvez obtenir plus d\'informations sur une commande via : '+`${prefix}help [command name]`+'```');

			//return message.author.send(data, { split: true })
			return message.author.send({ content: data })
//				.then(() => {
//					if (message.channel.type === 'dm') return;
//					message.reply({ content: 'I\'ve sent you a DM with all my commands!'});
//				})
//				.catch(error => {
//					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
//					message.reply({ content: 'it seems like I can\'t DM you! Do you have DMs disabled?'});
//				});
		}
		
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.author.send({ content: ' : Cette commande n\'existe pas!'});
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.author.send({ content: data });
	},
};

