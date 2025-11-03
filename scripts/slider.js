document.addEventListener('DOMContentLoaded', () => {
  const controlPrev = document.querySelector('.js-controls-prev');
  const controlNext = document.querySelector('.js-controls-next');
  const slides = document.querySelectorAll('.comments__slide');

  let currentID = 0;
  let currentSlide = slides[currentID];
  const slidesLength = slides.length;

  const changeSlide = (index) => {  
    currentSlide.classList.remove('comments__slide--active');

    if (index < 0) {
      currentID = slidesLength - 1;
    } else {
      currentID = index % slidesLength;
    }

    const nextSlide = slides[currentID];
    nextSlide.classList.add('comments__slide--active');
    currentSlide = nextSlide;
  };

  controlPrev.addEventListener('click', () => changeSlide(currentID - 1));
  controlNext.addEventListener('click', () => changeSlide(currentID + 1));
})