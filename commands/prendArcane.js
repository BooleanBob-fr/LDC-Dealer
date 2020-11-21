const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'prendArcane',
	description: 'Pioche une carte de la pile ARCANE dans la main du joueur demandeur.',
	aliases: ['takearcane','DrawArcane', 'piocheArcane','piochearcane','prendsArcane','prendsarcane','take','takeArcane'],
	usage: '<none>',
	args: false,
	execute(message, args) {
		var tmp = new Array();
		var me_only = 0;
		var nb = random.int(0, board.arcane.length - 1);
		var msg = "";
		var my_player_number = 0;
		var player_found = 0;
		
		tmp.push(board.arcane[nb]);
		board.arcane.splice(nb, 1);
		for (i = 0; i < board.player.length; i++) {
			if ( board.player[i] == `${message.author.username}` ) {
				my_player_number = i;
				player_found = 1;
			}
		}
			
		var nb = 1;
		if ( player_found == 1 ) {
			nb += board.hands[my_player_number].length;
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
			nb+=1;
		});
		
			
		if ( player_found == 0 && tmp.length != 0 ) {
			board.hands.push(tmp);
			board.player.push(`${message.author.username}`);
		} else {
			tmp.forEach(function(element){
				board.hands[my_player_number].push(element);
			});
		}
		
		if ( me_only == 0 ){
			message.channel.send("__Tirage d'une Arcane pour "+board.player[my_player_number]+" :__\n"+msg, { split: true });
		} else {
			message.author.send("__Tirage d'une Arcane pour "+board.player[my_player_number]+" :__\n"+msg, { split: true });
		}
	},
};
