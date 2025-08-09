const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;

// Shuffle cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Flip card on click
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.name;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  });
});

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.dataset.name === second.dataset.name) {
    first.classList.add('matched');
    second.classList.add('matched');
    flippedCards = [];
  } else {
    lockBoard = true;
    setTimeout(() => {
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      first.textContent = '';
      second.textContent = '';
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}