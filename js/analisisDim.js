// Definir los pares de valores por niveles
const levels = {
    1: {
        "Área": "L²",
        "Volumen": "L³",
        "Ángulo plano": "nulo",
        "Ángulo sólido": "nulo",
        "Velocidad": "LT⁻¹",
        "Aceleración": "LT⁻²",
        "Velocidad angular": "T⁻¹ ",
        "Aceleración angular": "T⁻²"
    },
    2: {
        "Velocidad aerolar": "L³T⁻¹",
        "Densidad de masa": "ML⁻³",
        "Densidad lineal de masa": "ML⁻¹",
        "Densidad superficial de masa": "ML⁻²",
        "Peso específico": "ML⁻²T⁻²",
        "Volumen específico": "L³M⁻¹",
        "Concentración": "NL⁻³",
        "Número de avogadro": "N⁻³"
    }
};

// Variables para el juego
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let currentLevel = 1;

// Crear el tablero de juego
const gameBoard = document.getElementById('game-board');
const winMessage = document.getElementById('win-msg');
const resetButton = document.getElementById('reset-button');
const level1Button = document.getElementById('level1-button');
const level2Button = document.getElementById('level2-button');

resetButton.addEventListener('click', resetGame);
level1Button.addEventListener('click', () => setLevel(1));
level2Button.addEventListener('click', () => setLevel(2));

function initializeGame(level) {
    cards = [];
    const pairs = levels[level];

    // Generar las tarjetas mezcladas
    for (const [name, equation] of Object.entries(pairs)) {
        cards.push({ type: 'name', value: name });
        cards.push({ type: 'equation', value: equation });
    }
    cards = shuffle(cards);

    // Limpiar el tablero de juego
    gameBoard.innerHTML = '';
    winMessage.style.display = 'none';

    // Mostrar las tarjetas en el tablero
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.type = card.type;
        cardElement.dataset.value = card.value;
        cardElement.innerHTML = '&nbsp;';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    // Reiniciar variables
    flippedCards = [];
    matchedPairs = 0;
}

// Función para barajar las tarjetas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para voltear una tarjeta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Función para verificar si las tarjetas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;

    if ((card1.dataset.type === 'name' && card2.dataset.type === 'equation' && levels[currentLevel][card1.dataset.value] === card2.dataset.value) ||
        (card2.dataset.type === 'name' && card1.dataset.type === 'equation' && levels[currentLevel][card2.dataset.value] === card1.dataset.value)) {
        matchedPairs++;
        card1.classList.add('matched');
        card2.classList.add('matched');

        // Indicar que ha ganado
        if (matchedPairs === Object.keys(levels[currentLevel]).length) {
            winMessage.classList.remove('hidden');
            winMessage.style.display = 'block';
        }
    } else {
        card1.classList.remove('flipped');
        card1.innerHTML = '&nbsp;';
        card2.classList.remove('flipped');
        card2.innerHTML = '&nbsp;';
    }

    flippedCards = [];
}

// Función para reiniciar el juego
function resetGame() {
    initializeGame(currentLevel);
}

// Función para establecer el nivel y reiniciar el juego
function setLevel(level) {
    currentLevel = level;
    initializeGame(currentLevel);
}

// Inicializar el juego al cargar la página con el nivel 1
initializeGame(currentLevel);
