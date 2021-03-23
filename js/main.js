const navBar = document.querySelector('.navigation1');
const navElements = document.querySelectorAll('.navElem');

window.onload = function() {
    console.dir(navElements);
};

function navElemMDownHandler(e) {
    e.preventDefault();
    navBar.querySelector('.navElemSelected').classList.remove('navElemSelected');
    e.target.closest('.navElem').classList.add('navElemSelected');
}

for (let i = 0; i < navElements.length; i++) {
    navElements[i].addEventListener('mousedown', navElemMDownHandler);
}