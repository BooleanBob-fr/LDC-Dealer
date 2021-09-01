const { prefix } = require('../config.json');
const board = require('../board.js');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'mélange',
	description: 'Mélange la défausse dans la pioche (DECK).',
	aliases: ['Shuffle','shuffle','Mélange','melange','Melange'],
	usage: '<no_args>',
	cooldown: 5,
	args: false,
	user: 'MJ',
	execute(message, args) {
		
		if (board.deck == null) {
			return message.channel.send({ content: `${message.author}`+": Le plateau n'est pas initialisé."}, { split: true });
		}	
		
		//console.log(" * Discard length : " +board.discard.length);
		//console.log(" * Deck length : " +board.deck.length);
		var i = 0;
		for (i = 0; i < board.discard.length; i++) {
			//console.log(" * " +i);
			board.deck.push(board.discard[i]);
		}
		
		board.discard = new Array();
		shuffle(board.deck);
		message.channel.send({ content: `${message.author}`+": Mélange effectué."}, { split: true });
		//console.log(" * Discard length : " +board.discard.length);
		//console.log(" * Deck length : " +board.deck.length);
	},
};
