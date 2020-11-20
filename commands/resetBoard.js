const { prefix } = require('../config.json');
const board = require('../board.js');
var shuffle = require('shuffle-array');
var util = require('util');
const random = require('random');

module.exports = {
	name: 'resetBoard',
	description: 'Reset the board by removing all cards and shuffle the deck.',
	aliases: ['resetBoard','resetboard','reset','setBoard','setboard','set'],
	usage: '<no_args>',
	cooldown: 5,
	args: false,
	execute(message, args) {
		
		// Check if board was initialized and clean up
		if (board.deck != null) {
			console.log("Something initialised. Let's destroy it.")
			board.deck = null;
			board.arcane = null;
			board.discard = null;
			board.hands = null;
		}
		
		// Initialize board
		console.log("Initializing Array.")
		board.deck = new Array();
		board.arcane = new Array();
		board.discard = new Array();
		board.hands = new Array();
		board.player = new Array();
	
		// Basic Card
		console.log("Initializing Basic Cards.")
		var i;
		var j;
		for (i = 1; i < 5; i++) {
			for (j = 1; j < 15; j++) {
				//console.log("Creating Card "+i+" / "+j);
				const currentCard = new Object();
				currentCard.type = i ;
				currentCard.number = j ;
				
				board.deck.push(currentCard);
			}
		} 
	
		// Arcane card
		console.log("Initializing Arcane Cards.")
		for (j = 1; j <= 22; j++) {
			const currentCard = new Object();
				//console.log("Creating Card "+5+" / "+j);
				currentCard.type = 5 ;
				currentCard.number = j ;
			board.arcane.push(currentCard);
		}
		
		var nb = random.int(0, board.arcane.length - 1);
		board.deck.push(board.arcane[nb]);
		board.arcane.splice(nb, 1);
			
		shuffle(board.deck);
			
		//console.log("Initialization done.");		
		message.channel.send("Plateau initialisé.", { split: true });
	},
};