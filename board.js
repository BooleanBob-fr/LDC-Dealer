const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const deck = null;
const arcane = null;
const discard = null;
const hands = null;
const player = null;

const cardType = ['de Griffe (Noire)','de Souffle (Noire)','de Sang (Rouge)','d\'Ecaille (Rouge)','L\'Arcane '];
const cardNumber = ['Un ','Deux ','Trois ','Quatre ','Cinq ','Six ','Sept ','Huit ','Neuf ','Dix ','Valet ','Cavalier ','Dame ','Roi '];
const cardArcane = ['0 : L\'Astrologue en Prière','1 : La Tisserande oubliée','2 : Le voleur sans Mémoire','3 : Le Jongleur indécis','4 : La Danseuse à l\'épée','5 : La Sentinelle silencieuse','6 : L\'Enlumineur aveugle','7 : Le Maître d\'armes aux Flambeaux','8 : La Vestale de Pierre','9 : La Pèlerin immobile','10 : L\'Hérésiarque couronné','11 : Le Gentilhomme au Corbeau','12 : L\'Architecte des Mondes','13 : La Courtisane amoureuse','14 : L\'Assassin sans Visage','15 :L\'Horloger des Chimères','16 : La Gardienne derrière le Miroir','17 : La Magicienne sous le Voile','18 : La Demoiselle en la Tour','19 : L\'Alchimiste des Ombres','20 : Le Guerrier immortel','21 : Le Chevalier au Dragon'];

