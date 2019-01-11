/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, actvePlayer, gamePlaying;

init();

/* part of double six rule, commented out in dice roll funciton, see long commnet below */
// var lastDice;



document.querySelector('.btn-roll').addEventListener('click', function (){
	    if (gamePlaying){
		//1. Random number

		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//2. Display result

		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

		//3. Update the round score IF the rolled number was NOT a 1

		if (dice1 !== 1 && dice2 !== 1){
		//add score
		roundScore += dice1 + dice2;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;

		}else{
			//next player
			nextPlayer();
		}
		
		/*in the single dice version of the game, this rule makes two sixes set player score to zero.
		  It is incompatable with the two dice verison of the game and because it is a dumb rule and I 
		  like the two dice version better, it is commented out. If the game is refactored for a single 
		  die, this rule can be integrated by replacing the third step in the above dice roll function
		  and by uncommenting the "var lastDice;" which is declared outside of that function */
	
		// if (dice === 6 && lastDice === 6){
		// 	//player looses score
		// 	scores[activePlayer] = 0;
		// 	document.querySelector('#score-' + activePlayer).textContent = '0';
		// 	nextPlayer();
		// } else if (dice !== 1){
		// 	//add score
		// 	roundScore += dice;
		// 	document.querySelector('#current-' + activePlayer).textContent = roundScore;
		// }else{
		// 	//next player
		// 	nextPlayer();
		// }

		// lastDice = dice;
	}		
});


document.querySelector('.btn-hold').addEventListener('click',function(){
	// Add CURRENT score to GLOBAL score
	scores[activePlayer] += roundScore;

	// Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	var input = document.querySelector('.final-score').value;
	var winningScore;

	if (input){
		winningScore = input;
	} else{
		winningScore = 100;
	}

	// Check if player won the game
	if (scores[activePlayer]>= winningScore){
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;

	} else {
		nextPlayer();
	}

});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

};


function init(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner')
	document.querySelector('.player-1-panel').classList.remove('winner')
	document.querySelector('.player-0-panel').classList.remove('active')
	document.querySelector('.player-1-panel').classList.remove('active')

	document.querySelector('.player-0-panel').classList.add('active')

}