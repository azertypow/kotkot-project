/**
 * Created by mathi on 11/05/2017.
 */

/* Variables de test */
// Problème non-identifié avec cette variable rentrée en paramètre de la fonction selectTwoPlayers()
// => c'est à cause de requestAnimationFrame qui agit bizarrement avec les fonctions qui ont des paramètres, à corriger
// selectedPlayers = [0,3];


/* Toutes les variables globales */
var players = 8;
var numberOfLeds = 10; /* nombre de leds sur une seule bande */
var spaceBetweenLeds = 30;



var counter = 0;
var centerToBorderCounter = 0; /* paramètre pour l'animation du temps de vote */

/* Paramètres de durée */
var durationPlayerSelection = 100;
var voteDuration = 1000; /* doit être proportionnel à la variable numberOfLeds */

