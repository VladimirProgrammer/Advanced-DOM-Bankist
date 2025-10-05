'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const allSelections = document.querySelectorAll('.section');
const logo = document.querySelector('.nav__logo');
const link = document.querySelector('.nav__link--btn');
const navLinks = document.querySelector('.nav__links');
const navItem = document.querySelector('.nav__item');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const operations = document.querySelector('.operations__tab-container');
const operContent = document.querySelectorAll('.operations__content');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  e.preventDefault();
  // Scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  //section1.scrollIntoView({ behavior: 'smooth' });
});

operations.addEventListener('click', function (e) {
  if (!e.target.classList.contains('btn')) return;
  [...operations.children].forEach(el => {
    el.classList.remove('operations__tab--active');
  });
  e.target.dataset.tab;

  e.target.classList.add('operations__tab--active');
  [...operContent].forEach(el =>
    el.classList.remove(`operations__content--active`)
  );
  document
    .querySelector(`.operations__content--${e.target.dataset.tab}`)
    .classList.add(`operations__content--active`);
});
const handleHover = function (e) {
  if (!e.target.classList.contains('nav__link')) return;
  const link = e.target;
  const syblings = link.closest('.nav__links').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');
  syblings.forEach(el => {
    if (el !== link) {
      el.style.opacity = this;
      logo.style.opacity = this;
    }
  });
};

navLinks.addEventListener('mouseover', handleHover.bind(0.5));

navLinks.addEventListener('mouseout', handleHover.bind(1));

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
console.log(nav.getBoundingClientRect());
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,

  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
const sectionVisible = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionVisible, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

// Создаем intersection observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  scrollMargin: '200px',
});
// Observe каждую img
imgTargets.forEach(img => imgObserver.observe(img));

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  console.log(slides);
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
  });

  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  let curSlide = 0;
  let maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
    goToSlide(curSlide);
    activeDots(curSlide);
  };

  const prevSlide = function () {
    if (curSlide <= 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDots(curSlide);
  };
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
  const dotsCont = document.querySelector('.dots');
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsCont.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  dotsCont.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activeDots(slide);
    }
  });

  const init = function () {
    createDots();
    activeDots(0);
    goToSlide(0);
  };
  init();
};
slider();
