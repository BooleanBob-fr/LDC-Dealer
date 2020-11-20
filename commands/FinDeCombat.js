const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'FinDeCombat',
	description: 'Vide les mains des joueurs à l\'exception des cartes Arcane.',
	aliases: ['FinDeCombat','flush','clean','vide'],
	usage: '<none>',
	args: false,
	execute(message, args) {

		var msg = "";
		var i = 0;
		var y = 0;
			
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
		message.channel.send("Les mains ont été vidées des cartes de base vers la défausse.", { split: true });
	},
};