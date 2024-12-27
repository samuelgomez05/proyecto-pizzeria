/* SWIPER PIZZAS NEWS */
const swiperNews = new Swiper('.swiper-news', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 24,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },

  pagination: {
    el: '.swiper-pagination-news',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next-news',
    prevEl: '.swiper-button-prev-news',
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  },
});

/* SWIPER PIZZAS RECOMMENDED */
const swiperRecommended = new Swiper('.swiper-recommended', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 24,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },

  pagination: {
    el: '.swiper-pagination-recommended',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next-recommended',
    prevEl: '.swiper-button-prev-recommended',
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  },
});

/* SWIPER PIZZAS MORE SALES */
const swiperMoreSales = new Swiper('.swiper-more-sales', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 24,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },

  pagination: {
    el: '.swiper-pagination-more-sales',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next-more-sales',
    prevEl: '.swiper-button-prev-more-sales',
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  },
});