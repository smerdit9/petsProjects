// бургер
let burger = document.querySelector('.burger__menu');
let menu = document.querySelector('.header__nav');
let close = document.querySelector('.close')

burger.addEventListener('click',

  function () {

    menu.classList.toggle('header__nav--active');

    document.body.classList.toggle('stop__scroll');

  })

close.addEventListener('click',

  function () {

    menu.classList.remove('header__nav--active');

    document.body.classList.remove('stop__scroll');

  })
// бургер

// поиск
let searchBtn = document.querySelector('.header__search-btn');
let search = document.querySelector('.header__search');
let searchClosed = document.querySelector('.closed-search');

searchBtn.addEventListener('click',

  function () {

    search.classList.toggle('header__search--active');

  })

searchClosed.addEventListener('click',

  function () {

    search.classList.remove('header__search--active');

  })
// поиск

// слайдер

const swiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
});

// слайдер