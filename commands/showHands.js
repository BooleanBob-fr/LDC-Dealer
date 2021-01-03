const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'showHands',
	description: 'Show the player hand.',
	aliases: ['showhands','voirMains'],
	usage: '<none>',
	args: false,
	execute(message, args) {

		var msg = "";
		var nb = 1;
		
		if (board.deck == null) {
			return message.channel.send(`${message.author}`+": Le plateau n'est pas initialisé.", { split: true });
		}
		
		for (i = 0; i < board.player.length; i++) {
			board.hands[i].forEach(function(element){
				if ( element.type == 5 ) {
					msg+="```css\n"+nb+" => "+config.cardType[element.type - 1]+config.cardArcane[element.number - 1]+"```\n";
				} else {
					if ( config.cardType[element.type - 1].indexOf("Rouge") > -1 ) {
						msg+="** "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"**\n";
					} else {
						msg+=" "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"\n";
					}
				}
				nb += 1;
			});
			message.author.send(`${message.author}`+": __Contenu de la main de "+board.player[i]+" :__\n"+msg, { split: true });
			nb = 1;
			msg = "";
		};
	},
};
