const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'pioche',
	description: 'Pioche <n> cartes dans la pioche DECK ou ARCANE.',
	aliases: ['draw','Draw', 'Pioche'],
	usage: '<nombre de cartes [1-9]> [<DECK|ARCANE>]',
	args: true,
	user: 'PJ',
	execute(message, args) {
		var nb = 0;
		
		if (board.deck == null) {
			return message.channel.send(`${message.author}`+": Le plateau n'est pas initialisé.", { split: true });
		}	
		
		if (!args.length) {
			return message.channel.send(`${message.author} : Des arguments sont manaquants. Rappel : nombre de cartes voulues.`);
		} 
		//console.log(" "+args[0]);
		if(!isNaN(args[0]) && args[0] < 10 && args[0] > 0) {
			//draw in ?
			if( args.length == 2 ) {
				if( args[1] == "DECK") {
					target="DECK";
				} else {
					target="ARCANE";
				}
			} else {
				target="DECK";
			}
			
			if( target == "DECK") {
				// draw 1 and delete
				var tmp = new Array();
				var nb_tirage = args[0];
				var nb_tirage_bis = 0;
				if ( args[0] > board.deck.length ) {
					nb_tirage = board.deck.length ;
					nb_tirage_bis = args[0] - nb_tirage ;
				}
				for (i = 1; i <= nb_tirage; i++) {
					tmp.push(board.deck[0]);
					board.deck.shift();
				}
				if ( nb_tirage_bis != 0 ) {
					
					// Reset de pioche
					message.channel.send(`${message.author}`+": * Mélange du deck effectué en cours de tirage.", { split: true });
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
		
				var msg = "";
				var do_shuffle = 0;
				nb= 1;
				tmp.forEach(function(element){
					if ( element.type == 5 ) {
						msg+="```css\n"+nb+" => "+config.cardType[element.type - 1]+config.cardArcane[element.number - 1]+"```\n";
						do_shuffle = 1 ;
					} else {
						if ( config.cardType[element.type - 1].indexOf("Rouge") > -1 ) {
							msg+="** "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"**\n";
						} else {
							msg+=" "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"\n";
						}
					}
					nb+=1;
					board.discard.push(element);
				});
				message.channel.send(`${message.author}`+": __Tirage pour "+`${message.author.username}`+" :__\n"+msg, { split: true });
				tmp = null;
				// shuffle ?
				if ( do_shuffle == 1) {
					for (i = 0; i < board.discard.length; i++) {
						//console.log(" * " +i);
						board.deck.push(board.discard[i]);
					}
		
					board.discard = new Array();
					shuffle(board.deck);
					message.channel.send(`${message.author}`+": Arcane(s) tirée(s). Mélange effectué.", { split: true });
				}
			} else {
				// print n random from ARCANE
				var tmp = new Array();
				for (i = 1; i <= args[0]; i++) {
					var nb = random.int(0, board.arcane.length - 1);
					tmp.push(board.arcane[nb]);
					board.arcane.splice(nb, 1);
				}
		
				var msg = "";
				nb = 1;
				tmp.forEach(function(element){
					if ( element.type == 5 ) {
						msg+="```css\n"+nb+" => "+config.cardType[element.type - 1]+config.cardArcane[element.number - 1]+"```\n";
						do_shuffle = 1 ;
					} else {
						if ( config.cardType[element.type - 1].indexOf("Rouge") > -1 ) {
							msg+="** "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"**\n";
						} else {
							msg+=" "+nb+" => "+config.cardNumber[element.number - 1]+config.cardType[element.type - 1]+"\n";
						}
					}
					nb+=1;
					board.arcane.push(element);
				});
				message.channel.send(`${message.author}`+": __Tirage :__\n"+msg, { split: true });
				tmp = null;
			}
			
		} else {
			return message.channel.send(`${message.author}`+": Le premier argument doit être compris entre 1 et 9 !");
		}
	},
};

