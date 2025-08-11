/* Tabs para mostrar los juegos */
function openGame(evt, gameName) {
    let i, juego, btnCard;
    juego = document.getElementsByClassName("juego");
    for (i = 0; i < juego.length; i++) {
        juego[i].style.display = "none";
    }
    btnCard = document.getElementsByClassName("card__button");
    for (i = 0; i < btnCard.length; i++) {
        btnCard[i].className = btnCard[i].className.replace(" active", "");
    }
    document.getElementById(gameName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* Pantalla completa */
function showFullScreen(id) {
    const gameContainer = document.getElementById(id);
    const iframe = document.getElementById('gameIframe');

    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) { // Firefox
        gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { // IE/Edge
        gameContainer.msRequestFullscreen();
    }

    gameContainer.classList.add('active');
    iframe.classList.add('active');
}

function exitFullScreen(id) {
    const gameContainer = document.getElementById(id);
    const iframe = document.getElementById('gameIframe');

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }

    gameContainer.classList.remove('active');
    iframe.classList.remove('active');
}
