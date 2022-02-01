'use strict';

// ********** Elements **********
const hamburger = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

// ********** Event Listeners **********

// Hamburger Menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Navigation Fade Effect
const handleHover = function (e) {
  if (e.target.tagName == 'A' || e.target.tagName == 'IMG') {
    const hoveredEl = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');

    if (hoveredEl === logo) {
      siblings.forEach((item) => (item.style.opacity = this));
    } else {
      siblings.forEach((item) => {
        if (hoveredEl !== item) {
          item.style.opacity = this;
          logo.style.opacity = this;
        }
      });
    }
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
