const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'finCombat',
	description: 'Vide les mains des joueurs à l\'exception des cartes Arcane.',
	aliases: ['finCombat','flush','clean','vide','fin','fincombat'],
	usage: '<none>',
	args: false,
	user: 'MJ',
	execute(message, args) {

		var msg = "";
		var i = 0;
		var y = 0;
		
		if (board.deck == null) {
			return message.channel.send(`${message.author}`+" : Le plateau n'est pas initialisé.", { split: true });
		}	
			
		for (i = board.player.length - 1; i >= 0 ; i--) {
			for (j = board.hands[i].length - 1; j >= 0 ; j--) {
				var element = board.hands[i][j];
				if ( element.type != 5 ) {
					board.discard.push(element);
					board.hands[i].splice(j,1);
				}
			};
			if ( board.hands[i].length == 0 ) {
				//message.channel.send("La main de "+board.player[i]+" est vide.\n"+msg, { split: true });
				board.hands.splice(i,1);
				board.player.splice(i,1);
			}
		};
		message.channel.send(`${message.author}`+" : Les mains ont été vidées des cartes de base vers la défausse.", { split: true });
	},
};
