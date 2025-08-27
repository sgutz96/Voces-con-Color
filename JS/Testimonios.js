var swiper = new Swiper(".recursosSwiper", {
    slidesPerView: 1,   // siempre 1 en pantalla
    spaceBetween: 30,   // separación entre tarjetas
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });