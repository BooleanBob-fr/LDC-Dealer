const config = require('../config.json');
const board = require('../board.js');
var util = require('util');

module.exports = {
	name: 'showBoard',
	description: 'Show the full board.',
	aliases: ['showBoard','showboard','showWorld','showworld'],
	usage: '<no_args>',
	args: false,
	cooldown: 5,
	execute(message, args) {
				
		// Check if board was initialized
		if (board.deck != null && Array.isArray(board.deck)) {
			var msg = "";
			nb = 1;
			board.deck.forEach(function(element){
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
			message.author.send("__Contenu de la Pioche :__\n"+msg, { split: true });
			
			msg = "";
			nb = 1;
			board.arcane.forEach(function(element){
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
			message.author.send("__Contenu du deck Arcane :__\n"+msg, { split: true });
			
			msg = "";
			nb = 1;
			if ( board.discard.length == 0 ) {
				msg = "Vide.";
			}
			board.discard.forEach(function(element){
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
			message.author.send("__Contenu de la défausse :__\n"+msg, { split: true });
			
			msg = "";
			nb = 1;
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
				message.author.send("__Contenu de la main de "+board.player[i]+" :__\n"+msg, { split: true });
				msg = "";
				nb = 1;
			};
			
			
		} else {
			message.channel.send("Plateau non-initialisé.", { split: true });
		}	
	},
};

