'use strict';

// ********** Elements **********
const hamburger = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const features = document.querySelector('#features-section');
const learnMore = document.querySelector('.btn--scroll');

// ********** Event Listeners **********

// Hamburger Menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Navigation Fade Effect
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hoveredEl = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach((item) => {
      if (hoveredEl !== item) {
        item.style.opacity = this;
      }
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Smooth Scrolling
nav.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    let link = e.target;
    if (link.tagName == 'IMG') link = e.target.closest('a');
    const sectionHref = link.getAttribute('href');
    document.querySelector(sectionHref).scrollIntoView({ behavior: 'smooth' });
  }
});

learnMore.addEventListener('click', () => {
  features.scrollIntoView({ behavior: 'smooth' });
});
