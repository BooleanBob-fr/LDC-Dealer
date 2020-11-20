const config = require('../config.json');
const board = require('../board.js');
var util = require('util');
const random = require('random');
var shuffle = require('shuffle-array');

module.exports = {
	name: 'déplace',
	description: 'Déplace la carte N°<n> d\'une pile ou main vers une autre pile ou main.',
	aliases: ['move','movecard','deplace'],
	usage: '<pile_origine> <numéro_carte_origine> <pile_destination>',
	args: true,
	execute(message, args) {
		var tmp = new Array();
		var msg = "";
		var from_player_number = 0;
		var from_player_found = 0;
		var target_player_number = 0;
		var target_player_found = 0;
		var nb = 1;
		var from = args[0];
		var target = args[2];
		var i = 0;
		var from_type = 0;
		var target_type = 0;
		var card = null;
		
		if ( args.length != 3 ) {
			return message.channel.send("Some arguments are missing. Need : initial storage, card_number and player target.", { split: true });
		}
		
		// DECK/ARCANE/DISCARD
		if ( args[0].toLowerCase() == "deck" ) {
			from_type = 2;
		}
		if ( args[0].toLowerCase() == "arcane" ) {
			from_type = 3;
		}
		if ( args[0].toLowerCase() == "discard" ) {
			from_type = 4;
		}
		if ( from_type == 0 ) {
			// Player name
			for (i = 0; i < board.player.length; i++) {
				console.log("Joueur testé : "+board.player[i]+" avec "+args[0]+".");
				if ( board.player[i] == args[0] ) {
					from_player_number = i;
					from_player_found = 1;
					from_type = 1 ;
				}
			}
			if ( from_player_found == 0 ) {
				return message.channel.send("La main du joueur "+args[0]+" n'existe pas.", { split: true });
			}
		}
		
				
		if(!isNaN(args[1]) && args[1] < 99 && args[1] > 0) {
			var my_card_number = args[1];
		}
				
		// DECK/ARCANE/DISCARD
		if ( args[2].toLowerCase() == "deck" ) {
			target_type = 2;
		}
		if ( args[2].toLowerCase() == "arcane" ) {
			target_type = 3;
		}
		if ( args[2].toLowerCase() == "discard" ) {
			target_type = 4;
		}
		if ( target_type == 0 ) {
			// Player name

			for (i = 0; i < board.player.length; i++) {
				if ( board.player[i] == args[2] ) {
					target_player_number = i;
					target_player_found = 1;
				}
			}
			target_type = 1;
		}
		
		// big case
		//console.log(""+from_type +" "+from+" "+args[2].charAt(0)+" "+target_type+" "+args[2].charAt(0)+" "+target);
		if ( from_type == 0 || target_type == 0 || args[0] == args[2]){
			console.log("From_type : "+from_type+" | target_type : "+target_type);
			return message.channel.send("Deck ou main de départ ou d'arrivée non trouvé(s) : "+args[0]+" ou "+args[2]+" invalide.", { split: true });
		}
		
		if ( from_type == 1 && target_type == 1 ){
			if ( board.hands[from_player_number].length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.hands[from_player_number].length+" cartes dans la main du joueur "+board.player[from_player_number]+". Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.hands[from_player_number][my_card_number - 1];
			tmp.push(card);
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
				}
			);
			
			if ( target_player_found == 1 ) {
				tmp.forEach(function(element){
					board.hands[target_player_number].push(element);
				});
			} else {
				board.hands.push(tmp);
				board.player.push(args[2]);
			}
			board.hands[from_player_number].splice(my_card_number - 1,1);
		}
		
		if ( from_type == 1 && target_type == 2 ){
			if ( board.hands[from_player_number].length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.hands[from_player_number].length+" cartes dans la main du joueur "+board.player[from_player_number]+". Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.hands[from_player_number][my_card_number - 1];
			tmp.push(card);
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
				}
			);
			
			tmp.forEach(function(element){
				board.deck.push(element);
			});
			board.hands[from_player_number].splice(my_card_number - 1,1);
		}

		if ( from_type == 1 && target_type == 3 ){
			if ( board.hands[from_player_number].length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.hands[from_player_number].length+" cartes dans la main du joueur "+board.player[from_player_number]+". Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.hands[from_player_number][my_card_number - 1];
			tmp.push(card);
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
				}
			);
			
			tmp.forEach(function(element){
				board.arcane.push(element);
			});
			board.hands[from_player_number].splice(my_card_number - 1,1);
		}

		if ( from_type == 1 && target_type == 4 ){
			if ( board.hands[from_player_number].length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.hands[from_player_number].length+" cartes dans la main du joueur "+board.player[from_player_number]+". Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.hands[from_player_number][my_card_number - 1];
			tmp.push(card);
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
				}
			);
			
			tmp.forEach(function(element){
				board.discard.push(element);
			});
			board.hands[from_player_number].splice(my_card_number - 1,1);
		}

		if ( from_type == 2 && target_type == 1 ) {
			if ( board.deck.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.deck.length+" cartes dans le deck de base. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.deck[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			
			if ( target_player_found == 1 ) {
				tmp.forEach(function(element){
					board.hands[target_player_number].push(element);
				});
			} else {
				board.hands.push(tmp);
				board.player.push(args[2]);
			}
			board.deck.splice(my_card_number - 1,1);
		}
		
				
		if ( from_type == 2 && target_type == 3 ) {
			if ( board.deck.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.deck.length+" cartes dans le deck de base. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.deck[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			

				tmp.forEach(function(element){
					board.arcane.push(element);
				});
			board.deck.splice(my_card_number - 1,1);
		}
		
		if ( from_type == 2 && target_type == 4 ) {
			if ( board.deck.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.deck.length+" cartes dans le deck de base. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.deck[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			

				tmp.forEach(function(element){
					board.discard.push(element);
				});
			board.deck.splice(my_card_number - 1,1);
		}
		
		if ( from_type == 3 && target_type == 1 ) {
			if ( board.arcane.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.arcane.length+" cartes dans le deck Arcane. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.arcane[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			
			if ( target_player_found == 1 ) {
				tmp.forEach(function(element){
					board.hands[target_player_number].push(element);
				});
			} else {
				board.hands.push(tmp);
				board.player.push(args[2]);
			}
			board.arcane.splice(my_card_number - 1,1);
		}
		
		if ( from_type == 3 && target_type == 2 ) {
			if ( board.arcane.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.arcane.length+" cartes dans le deck Arcane. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.arcane[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			

				tmp.forEach(function(element){
					board.deck.push(element);
				});
			board.arcane.splice(my_card_number - 1,1);
		}
		
				
		if ( from_type == 3 && target_type == 4 ) {
			if ( board.arcane.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.arcane.length+" cartes dans le deck Arcane. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.arcane[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			

				tmp.forEach(function(element){
					board.discard.push(element);
				});
			board.arcane.splice(my_card_number - 1,1);
		}
		
		if ( from_type == 4 && target_type == 1 ) {
			if ( board.discard.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.discard.length+" cartes dans la défausse. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.discard[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			
			if ( target_player_found == 1 ) {
				tmp.forEach(function(element){
					board.hands[target_player_number].push(element);
				});
			} else {
				board.hands.push(tmp);
				board.player.push(args[2]);
			}
			board.discard.splice(my_card_number - 1,1);
		}
		
		if ( from_type == 4 && target_type == 2 ) {
			if ( board.discard.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.discard.length+" cartes dans la défausse. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.discard[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			

				tmp.forEach(function(element){
					board.deck.push(element);
				});
			board.discard.splice(my_card_number - 1,1);
		}
		
		if ( from_type == 4 && target_type == 3 ) {
			if ( board.discard.length < my_card_number ){
				return message.channel.send("Il n'y a que "+board.discard.length+" cartes dans la défausse. Numéro demandé : "+my_card_number+".", { split: true });
			}			
		
			card = board.discard[my_card_number - 1];
			tmp.push(card);
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
				}
			);
			

			tmp.forEach(function(element){
				board.arcane.push(element);
			});
			board.discard.splice(my_card_number - 1,1);
		}
		
				
		return message.channel.send("__Déplacement depuis "+args[0]+" vers "+args[2]+" pour la carte :__\n"+msg, { split: true });
	
	},
};
