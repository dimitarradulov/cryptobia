'use strict';

// ********** Elements **********
const hamburger = document.querySelector('.nav__hamburger');
const navMenu = document.querySelector('.nav__menu');
const nav = document.querySelector('.nav');
const features = document.querySelector('#features-section');
const learnMore = document.querySelector('.btn--scroll');
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('.feature-image');
const header = document.querySelector('.header');

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
const sectionObserverOptions = {
  root: null,
  threshold: 0.1,
};

const sectionObserverCb = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');

    sectionObserver.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(
  sectionObserverCb,
  sectionObserverOptions
);

sections.forEach((s) => {
  sectionObserver.observe(s);
});

// Lazy Loading Img
const imageObserverOptions = {
  root: null,
  threshold: 0.3,
};

const imageObserverCb = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    const imageNum = entry.target.dataset.image;
    entry.target.setAttribute('src', `img/feature${imageNum}.jpg`);

    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );

    imageObserver.unobserve(entry.target);
  }
};

const imageObserver = new IntersectionObserver(
  imageObserverCb,
  imageObserverOptions
);

images.forEach((img) => imageObserver.observe(img));

// Sticky Navigation
const headerObserverCb = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(headerObserverCb, {
  root: null,
  threshold: 0.1,
});

headerObserver.observe(header);
