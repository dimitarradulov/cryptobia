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
const howItWorks = document.querySelector('.how-it-works');
const howItWorksTabs = document.querySelectorAll('.how-it-works__tab');
const howItWorksContents = document.querySelectorAll('.how-it-works__content');

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
  threshold: 0,
});

headerObserver.observe(header);

// Tabbed
howItWorks.addEventListener('click', (e) => {
  if (!e.target.classList.contains('how-it-works__tab')) return;

  const tab = e.target;

  howItWorksTabs.forEach((tab) =>
    tab.classList.remove('how-it-works__tab--active')
  );
  tab.classList.add('how-it-works__tab--active');

  const tabNumber = tab.dataset.tab;

  howItWorksContents.forEach((content) =>
    content.classList.remove('how-it-works__content--active')
  );
  document
    .querySelector(`.how-it-works__content--${tabNumber}`)
    .classList.add('how-it-works__content--active');
});

// Testimonial Slider
const slider = () => {
  const rightArrow = document.querySelector('.slider__arrow--right');
  const leftArrow = document.querySelector('.slider__arrow--left');
  const slideContainer = document.querySelector('.slide-container');
  const dotContainer = document.querySelector('.dots');

  let slides;
  let sizeOfSlide;
  let slideCounter = 0;

  const setSlidesAndSizeOfSlide = () => {
    slides = document.querySelectorAll('.slider__slide');
    sizeOfSlide = slides[0].clientWidth;
  };

  setSlidesAndSizeOfSlide();

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `
      <button class="dots__dot" data-slide="${i}">
        <i class="fas fa-circle fa-xs"></i>
      </button>
    `
      );
    });
  };

  createDots();

  const activateDot = (slide) => {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  activateDot(slideCounter);

  const moveSlide = (slide) => {
    // prettier-ignore
    return slideContainer.style.transform = `translateX(${-sizeOfSlide * slide}px)`;
  };

  const maxSlides = slides.length - 1;

  const nextSlide = () => {
    if (slideCounter === maxSlides) slideCounter = 0;
    else slideCounter++;

    moveSlide(slideCounter);
    activateDot(slideCounter);
  };

  const prevSlide = () => {
    if (slideCounter === 0) slideCounter = maxSlides;
    else slideCounter--;

    moveSlide(slideCounter);
    activateDot(slideCounter);
  };

  window.addEventListener('resize', () => {
    setSlidesAndSizeOfSlide();
    moveSlide();
  });

  rightArrow.addEventListener('click', nextSlide);
  leftArrow.addEventListener('click', prevSlide);

  dotContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('fas')) return;

    const slide = e.target.closest('.dots__dot').dataset.slide;

    moveSlide(slide);
    activateDot(slide);
  });
};

slider();
