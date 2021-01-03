const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'joue',
	description: 'Joue la carte <n> de la main du joueur demandeur.',
	aliases: ['play','joue', 'Utilise','utilise','Play','défausse','defausse'],
	usage: '<numéros de la carte dans la main [1-99] séparé d\'un espace>',
	args: true,
	execute(message, args) {
			
		var msg = "";
		var my_player_number = 0;
		var player_found = 0;
		var problem = 0;
		
		for (let arg_id = 0; arg_id < args.length; arg_id++) {
			if(isNaN(args[arg_id]) || args[arg_id] > 99 || args[arg_id] <= 0 || args.indexof(args[arg_id]) != arg_id ) {
				message.channel.send(""+`${message.author.username}`+" : Ce numéro de carte est invalide : "+args[arg_id]+".", { split: true });
				problem=1;
			}
				
		}
		
		if(problem == 0) {

			// Recherche de la main du joueur
			for (i = 0; i < board.player.length; i++) {
				if ( board.player[i] == `${message.author.username}` ) {
					my_player_number = i;
					player_found = 1;
				}
			}
			
			if ( player_found == 1 ) {
				// Check de l'existence des numéros de cartes en argument
				for (let arg_id = 0; arg_id < args.length; arg_id++) {
					if ( args[arg_id] > board.hands[my_player_number].length ) {
						problem = 2;
					}
				}
				
				if(problem == 0) {
					// Construction du message avec l'ensemble des cartes jouées
					for (let arg_id = 0; arg_id < args.length; arg_id++) {
						var card_number = args[arg_id] - 1;
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
						// Copie des cartes jouées dans la défausse
						board.discard.push(element);
					}
					message.channel.send(msg, { split: true });

					// Tri des numéros de carte en ordre décroissant
					args.sort((a, b) => b - a);
					
					// Suppression des cartes en ordre décroissant et si besoin, suppression de la main
					for (let arg_id = 0; arg_id < args.length; arg_id++) {
						var card_number = args[arg_id] - 1;
						
						var removedItem = board.hands[my_player_number].splice(card_number,1);
						if ( board.hands[my_player_number].length == 0 ) {
							var removedHand = board.hands.splice(my_player_number,1);
							var removedPlayer = board.player.splice(my_player_number,1);
						}
					}
				} else {
					message.channel.send(""+`${message.author.username}`+" : Certains numéros de cartes en arguments semblent inexistants dans votre main.", { split: true });
				}
			} else {
				message.channel.send(""+`${message.author.username}`+" : Pas de main, pas de chocolat.", { split: true });
			}	
		} else {
			message.channel.send(""+`${message.author.username}`+" : Les numéros de cartes en arguments semblent invalides. Rappel : [1-99] et sans doublon.", { split: true });
		}			
	},
};
