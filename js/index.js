/* Desplegar menu */
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector(".menu__icon");
    const menuNavbar = document.querySelector(".menu__navbar");

    if (menuIcon && menuNavbar) {
        menuIcon.addEventListener("click", function () {
            menuNavbar.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (!menuNavbar.contains(event.target) && event.target !== menuIcon && window.innerWidth <= 480) {
                menuNavbar.classList.remove("active");
            }
        });
    }
});

/* Regresar al inicio de la pagina */
let returnTop = document.querySelector("#returnTop");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.documentElement.scrollTop > 20) {
        returnTop.style.display = "block";
    } else {
        returnTop.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/* Desplegar modal de encuesta */
let modal = document.getElementsByClassName('modal');
let btnModal = document.getElementsByClassName('modal__button');
let closeModal = document.getElementsByClassName('modal__close');

for (let i = 0; i < btnModal.length; i++) {
    btnModal[i].onclick = function () {
        modal[i].style.display = "block";
    }
}

for (let i = 0; i < closeModal.length; i++) {
    closeModal[i].onclick = function () {
        modal[i].style.display = "none";
    }
}

window.onclick = function (e) {
    for (let i = 0; i < modal.length; i++) {
        if (e.target == modal[i]) {
            modal[i].style.display = "none";
        }
    }
}

/* Scroll horizontal manual */
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.roadmap-container');
    let isMouseDown = false;
    let startX, scrollLeft;

    container.addEventListener('mousedown', function (e) {
        isMouseDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', function () {
        isMouseDown = false;
    });

    container.addEventListener('mouseup', function () {
        isMouseDown = false;
    });

    container.addEventListener('mousemove', function (e) {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Ajusta la sensibilidad del desplazamiento horizontal
        container.scrollLeft = scrollLeft - walk;
    });
});

/* Alternar cursores del roadmap */
document.addEventListener('DOMContentLoaded', function () {
    const roadmap = document.querySelector('.roadmap');

    let isMouseDown = false;

    roadmap.addEventListener('mousedown', function () {
        isMouseDown = true;
        roadmap.classList.add('grabbing');
    });

    document.addEventListener('mouseup', function () {
        isMouseDown = false;
        roadmap.classList.remove('grabbing');
    });
});

// Permitir solo letras, incluyendo la "ñ"
function soloLetras(event) {
    var input = event.target;
    var valor = input.value;
    input.value = valor.replace(/[^a-zA-ZñÑ]/g, '');
}

/* Actualizar año Copyright */
const fechaCopy = document.querySelector('#actualizarCopy');

fechaCopy.textContent = new Date().getFullYear();

/* Filtrar el contenido del buscador en temas.html */
function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarBusquedas() {
    var input, filter, ul, li, details, i, txtValue;

    input = document.getElementById("mySearch");
    filter = normalizeString(input.value.toUpperCase());
    ul = document.getElementById("TemasContenedor");
    li = ul.getElementsByTagName("li");

    var msgSinResultdos = document.getElementById("mensajeSinResultados");
    var hasResults = false;

    for (i = 0; i < li.length; i++) {
        details = li[i].getElementsByTagName("details")[0];
        txtValue = normalizeString(details.textContent || details.innerText);

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            hasResults = true;
        } else {
            li[i].style.display = "none";
        }
    }

    // Mostrar u ocultar el mensaje de no resultados
    if (hasResults) {
        msgSinResultdos.style.display = "none";
    } else {
        msgSinResultdos.style.display = "block";
    }
}