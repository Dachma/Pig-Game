let scores, roundScore, activePlayer, gamePlaying, lastDice;

// functions for initial structure and the next player
// initial structure
function startGame() {
  scores = [0,0];
  gamePlaying = true;
  activePlayer = 0;
  roundScore = 0;
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}
// next player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
}

startGame();

// roll the dice

document.querySelector('.btn--roll').addEventListener('click', function() {
  // random dice number
  let dice = Math.floor(Math.random() * 6) + 1;
  if(gamePlaying) {
    // show the dice in DOM
    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // update roundscore
    // two sixes in a row loses entire score
    if(lastDice === 6 && dice === 6) {
      document.querySelector('#score--' + activePlayer).textContent = '0';
      nextPlayer();
    }else if(dice !== 1) {
      roundScore += dice;
      document.getElementById('current--' + activePlayer).textContent = roundScore;
    } else {
      document.querySelector('.dice').style.display = 'none';
      nextPlayer();
    }
  }
  lastDice = dice;
})

// hold the score

document.querySelector('.btn--hold').addEventListener('click', function() {
  if(gamePlaying) {
    // update global score and check if player won
    scores[activePlayer] += roundScore;
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('.dice').style.display = 'none';

    let winningScore = document.getElementById('winScore').value;
    let input;

    if(winningScore) {
      input = winningScore;
    } else {
      input = 15;
    }

    if(scores[activePlayer] >= input) {
      document.querySelector('#name--' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.player--' + activePlayer).classList.add('player--winner');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
})

document.querySelector('.btn--new').addEventListener('click', startGame);