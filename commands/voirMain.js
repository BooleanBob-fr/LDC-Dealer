const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'voirSaMain',
	description: 'Envoie la main du joueur demandeur. (en MP).',
	aliases: ['showhand','voirMain', 'voir', 'main','show','voirmain'],
	usage: '<none>',
	args: false,
	execute(message, args) {

		var msg = "";
		var my_player_number = 0;
		var player_found = 0;
		
		if (board.deck == null) {
			return message.channel.send(`${message.author}`+": Le plateau n'est pas initialisé.", { split: true });
		}
		
		for (i = 0; i < board.player.length; i++) {
			if ( board.player[i] == `${message.author.username}` ) {
				my_player_number = i;
				player_found = 1;
			}
		}
	
		if ( player_found == 1 ) {
			var nb = 1;
			board.hands[my_player_number].forEach(function(element){
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
				message.author.send(`${message.author}`+": __Contenu de la main de "+board.player[my_player_number]+" :__\n"+msg, { split: true });
				
		} else {
			message.channel.send(""+`${message.author}`+": Tu n'as pas de main, donc pas de chocolat.", { split: true });
		}
		
	},
};
