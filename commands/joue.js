const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'joue',
	description: 'Joue la carte <n> de la main du joueur demandeur.',
	aliases: ['play','joue', 'Utilise','utilise','Play','défausse','defausse'],
	usage: '<numéro de la carte dans la main [1-99]>',
	args: true,
	execute(message, args) {
			
		var msg = "";
		var my_player_number = 0;
		var player_found = 0;
		
		if(!isNaN(args[0]) && args[0] <= 99 && args[0] > 0) {
			
			
			
			//board.hands.push(tmp);
			//board.player.push(`${message.author}`);
			// find hand number
			for (i = 0; i < board.player.length; i++) {
				if ( board.player[i] == `${message.author.username}` ) {
					my_player_number = i;
					player_found = 1;
				}
			}
			
			if ( player_found == 1 ) {
				
				// Message construction
				if ( args[0] <= board.hands[my_player_number].length ) {
					var card_number = args[0] - 1;
					var element = board.hands[my_player_number][card_number];
					msg = ""+`${message.author.username}`+" joue de sa main : \n";
					if ( element.type == 5 ) {
						msg+="```css\n"+nb+" => "+config.cardType[element.type - 1]+config.cardArcane[element.number - 1]+"```\n";
					} else {
						if ( config.cardType[element.type - 1].indexOf("Rouge") > -1 ) {
							msg+="** "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"**\n";
						} else {
							msg+=" "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"\n";
						}
					}
					board.discard.push(element);
					message.channel.send(msg, { split: true });
					
					// Remove card and maybe hand
					var removedItem = board.hands[my_player_number].splice(card_number,1);
					if ( board.hands[my_player_number].length == 0 ) {
						var removedHand = board.hands.splice(my_player_number,1);
						var removedPlayer = board.player.splice(my_player_number,1);
					}
				} else {
					message.channel.send(""+`${message.author.username}`+" : Vous n'avez pas de cartes N°"+args[0]+".", { split: true });
				}
				
			} else {
				message.channel.send(""+`${message.author.username}`+" : Pas de main, pas de chocolat.", { split: true });
			}			
		}
	},
};
