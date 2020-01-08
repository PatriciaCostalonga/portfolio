const track = document.querySelector('.carousel_track');

const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');

const dotsNav = document.querySelector('#carousel_nav'); //navigation indicator

const dots = Array.from(dotsNav.children);

// const slideSize = slides[0].getBoundingClientRect(); //to show in DOM the size of the slide depending on the viewport by using console.log(slideSize);

const slideWidth = slides[0].getBoundingClientRect().width;

console.log(slideWidth);

// console.log(slides); //to test stuff on the console

/* arrange the slides next to each other:
slides[0].style.left = 0;
slides[1].style.left = slideWidth + 'px';
slides[2].style.left = slideWidth * 2 + 'px';

transformed in a loop below:
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
})

to make it easier for other people to understand, let's transform it into a function and then call the loop */

// => Arrow functions allow us to write shorter function syntax

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

//to see current selected dot:
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  //to hide or show the left and right buttons, we'll work the the index number from the dots array:
  if(targetIndex === 0){
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
  //the "slides.length - 1" will match the last index array number:
  else if(targetIndex === slides.length - 1){
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  }
  //for all the slides between them, show both arrow buttons:
  else{
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

//when user clicks left, slides will move to the left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;

  //to make the current dot match the current slide:
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;

  //to hide-show arrow buttons:
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  //to make the current dot match the current slide:
  updateDots(currentDot, prevDot);

  //to hide-show arrow buttons:
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

//when user clicks right, slides will move to the right
nextButton.addEventListener('click', e => {
  //track works to find faster an specific element in a document. doesn't need to look in the whole document. makes your program faster.
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  //to make the current dot match the current slide:
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;

  //to hide-show arrow buttons:
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  // const amountToMove = nextSlide.style.left;
  //move to the next slide
  // console.log(amountToMove); to discover how much is the amountToMove
  /* since the method below would get repetitive, it's better to transform it into a function, so it's possible to use it again:
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide'); */

  moveToSlide(track, currentSlide, nextSlide);

  //to make the current dot match the current slide:
  updateDots(currentDot, nextDot);

  //to hide-show arrow buttons:
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

//when user clicks on the nav indicators, slides will move to the clicked one

dotsNav.addEventListener('click', e => {
  //what indicator was clicked on:
  const targetDot = e.target.closest('button');

  /* to check where you are clicking on:
  console.log(e);
  to show only the specific element clicked on:
  console.log(e.target); */
  // console.log(targetDot);
  /* The below example is to show test1, if the function is null. Then it will stop as soon the user clicks on something that shouldn't do anything:
  console.log(test1);
  if (!targetDot) return;
  console.log(test2); */

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');

  //to find which element the user is currently at, we'll use the function below. findIndex will loop through every item in the array and return the first true expression that comes out of it. For each DOT inside dots, return the first dot that is equal to my targetDot, the clicked on dot. Isn't returning the dot itself, but the index number of that.
  const targetIndex = dots.findIndex(dot => dot === targetDot);

  /* to show the index number from the dots array:
  console.log(targetIndex); */
  /* to show dots array:
  console.log(dots); */

  // The target index, let us find the target slide. The target slide will call the target index number:
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);

  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})
