const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'piocheMain',
	description: 'Pioche <n> cartes de la pioche (DECK) vers la main du joueur demandeur.',
	aliases: ['piochemain','DrawHand', 'piocheMain','drawhand'],
	usage: '<nombre de cartes : [1-9]>',
	args: true,
	execute(message, args) {
		var tmp = new Array();
		var nb_tirage = args[0];
		var nb_tirage_bis = 0;
		var me_only = 0;
		var msg = "";
		var do_shuffle = 0;
		var my_player_number = 0;
		var player_found = 0;
		
		if(!isNaN(args[0]) && args[0] < 10 && args[0] > 0) {
			
			//message.channel.send(` DrawHand pour ${message.author}.`, { split: true });
			
			if ( args[0] > board.deck.length ) {
				nb_tirage = board.deck.length ;
				nb_tirage_bis = args[0] - nb_tirage ;
			}
			if ( args.length == 2 ) {
				me_only = 1 ;
			}
			
			for (i = 1; i <= nb_tirage; i++) {
				tmp.push(board.deck[0]);
				board.deck.shift();
			}
			if ( nb_tirage_bis != 0 ) {
						
				// Reset de pioche
				message.channel.send("* Mélange du deck effectué en cours de tirage.", { split: true });
				var i = 0;
				for (i = 0; i < board.discard.length; i++) {
					//console.log(" * " +i);
					board.deck.push(board.discard[i]);
				}
			
				board.discard = new Array();
				shuffle(board.deck);
						
				// Tirage bis
				for (i = 1; i <= nb_tirage_bis; i++) {
					tmp.push(board.deck[0]);
					board.deck.shift();
				}
				
			}
		
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
					do_shuffle = 1 ;
					board.discard.push(element);
				} else {
					if ( config.cardType[element.type - 1].indexOf("Rouge") > -1 ) {
						msg+="** "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"**\n";
					} else {
						msg+=" "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"\n";
					}
					nb+=1;
				}
			});
			if ( me_only == 0 ){
				message.channel.send("__Tirage de main pour "+`${message.author.username}`+" :__\n"+msg, { split: true });
			} else {
				message.author.send("__Tirage de main pour "+`${message.author.username}`+" :__\n"+msg, { split: true });
			}
			
			if ( player_found == 0 && tmp.length != 0 ) {
				board.hands.push(tmp);
				board.player.push(`${message.author.username}`);
			} else {
				tmp.forEach(function(element){
					board.hands[my_player_number].push(element);
				});
			}
			
		
			// shuffle ?
			if ( do_shuffle == 1) {
				for (i = 0; i < board.discard.length; i++) {
					//console.log(" * " +i);
					board.deck.push(board.discard[i]);
				}
			
				board.discard = new Array();
				shuffle(board.deck);
				message.channel.send("Arcane(s) tirée(s). Mélange du deck effectué.", { split: true });
			}
		} else {
			message.channel.send("args must be a number [1-9].");
		}
	},
};