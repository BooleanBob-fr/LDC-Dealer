const config = require('../config.json');
const board = require('../board.js');
var util = require('util');

module.exports = {
	name: 'showDiscard',
	description: 'Show the Discard cards.',
	aliases: ['showdiscard','voirDéfausse','voirdéfausse','voirDfausse','voirdefausse'],
	usage: '<no_args>',
	args: false,
	cooldown: 5,
	execute(message, args) {
		
			msg = "";
			if ( board.discard.length == 0 ) {
				msg = "Vide.";
			}
			nb = 1;
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
			
	},
};