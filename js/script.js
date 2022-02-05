'use strict';

// ********** Elements **********
const hamburger = document.querySelector('.nav__hamburger');
const navMenu = document.querySelector('.nav__menu');
const nav = document.querySelector('.nav');
const features = document.querySelector('#features-section');
const learnMore = document.querySelector('.btn--scroll');
const sections = document.querySelectorAll('.section');

// Hamburger Menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navMenu.addEventListener('click', function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  hamburger.classList.remove('active');
  this.classList.remove('active');
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

// Sections Reveal
const options = {
  root: null,
  threshold: 0.1,
};

const observerCallback = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};

const observer = new IntersectionObserver(observerCallback, options);

sections.forEach((s) => {
  observer.observe(s);
});
