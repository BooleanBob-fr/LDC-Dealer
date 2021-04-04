const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'don',
	description: 'Donne la carte <n> de la main du joueur demandeur à un autre joueur.',
	aliases: ['givecard','give','donne'],
	usage: '<numéro_de_carte_dans_la_main> <nom_autre_joueur>',
	user: 'PJ',
	args: true,
	execute(message, args) {
		var tmp = new Array();
		var msg = "";
		var my_player_number = 0;
		var player_found = 0;
		var my_target_number = 0;
		var target_found = 0;
		var nb = 1;
		
		if (board.deck == null) {
			return message.channel.send(`${message.author}`+": Le plateau n'est pas initialisé.", { split: true });
		}	
		
		if ( args.length != 2 ) {
			return message.channel.send(`${message.author}`+": Il manque des arguments. Rappel : Numéro de carte et Joueur ciblé par le don.", { split: true });
		}
		
		if(!isNaN(args[0]) && args[0] < 99 && args[0] > 0) {
			var my_player_card_number = args[0];
		}
				
		var player_target = args[1];
		
		for (i = 0; i < board.player.length; i++) {
			if ( board.player[i] == `${message.author.username}` ) {
				my_player_number = i;
				player_found = 1;
			}
			if ( board.player[i] == player_target ) {
				my_target_number = i;
				target_found = 1;
			}
		}
		if ( player_found == 1 ) {
			if ( board.hands[my_player_number].length < my_player_card_number ){
				return message.channel.send("No card N°"+my_player_card_number+" in "+`${message.author.username}`+" hand.", { split: true });
			}			
		} else {
			return message.channel.send(""+`${message.author.username}`+" : Vous n'avez pas de main.", { split: true });
		}
		var card = board.hands[my_player_number][my_player_card_number - 1];
		tmp.push(card);
		
		if ( target_found == 1 ) {
			tmp.forEach(function(element){
				board.hands[my_target_number].push(element);
			});
			nb = board.hands[my_target_number].length;
		} else {
			board.hands.push(tmp);
			board.player.push(player_target);
		}
		
		tmp.forEach(function(element){
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
		
		
		
		
		board.hands[my_player_number].splice(my_player_card_number - 1, 1);
		if ( board.hands[my_player_number].length == 0 ) {
			var removedHand = board.hands.splice(my_player_number,1);
			var removedPlayer = board.player.splice(my_player_number,1);
		}
		
		return message.channel.send(`${message.author}`+": "+`${message.author.username}`+" donne la carte "+msg+" au joueur "+player_target+".", { split: true });
	
	},
};
