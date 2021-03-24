const navBar = document.querySelector('.navBar');
const navElements = navBar.querySelectorAll('.navElem');
const sectionStripe = document.querySelector('.sectionsGrid');

window.onload = function() {
    console.dir(navElements);
};

function animate({ timing, draw, duration }) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        // calculate the current animation state
        let progress = timing(timeFraction);
        draw(progress); // draw it
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function scrollToSection(sectionNum) {
    let sectionWidth = sectionStripe.children[0].getBoundingClientRect().width;
    if (window.safari !== undefined || navigator.vendor == 'Apple Computer, Inc.') {
        let startScrollLeft = sectionStripe.scrollLeft;
        animate({
            duration: 600,
            timing: function quad(timeFraction) {
                return Math.pow(timeFraction, 2);
            },
            draw: function scrollElem(progress) {
                sectionStripe.scrollLeft = startScrollLeft - ((startScrollLeft - sectionNum * sectionWidth) * progress);
            }
        });
    } else {
        sectionStripe.scrollTo({
            top: 0,
            left: sectionNum * sectionWidth,
            behavior: 'smooth'
        });
    }
}

function navElemMDownHandler(e, sectionNum) {
    e.preventDefault();
    navBar.querySelector('.navElemSelected').classList.remove('navElemSelected');
    e.target.closest('.navElem').classList.add('navElemSelected');
    scrollToSection(sectionNum);
}

for (let i = 0; i < navElements.length; i++) {
    navElements[i].addEventListener('mousedown', (e) => { navElemMDownHandler(e, i) });
}