const scrollElements = document.querySelectorAll('.js-scroll');
scrollElements.forEach((el) => {
  if (elementInView(el, .5)) {
    displayScrollElement(el)
  }
}
)
//listens to when the page is being scrolled on and applies the animations
window.addEventListener('scroll', throttle(handleScrollAnimation, 100))
// display functions
// checks whether element is in viewable area
function elementInView(el, amountInView = 1) {
  const elementTop = el.getBoundingClientRect().top;
  const elementHeight = el.getBoundingClientRect().height;
  return (
    elementTop <= document.documentElement.clientHeight && elementTop + (elementHeight * amountInView)> 0
  )
}
// checks whether element is below or above viewable area
function elementOutOfView(el) {
  const elementTop = el.getBoundingClientRect().top;
  const elementBottom = el.getBoundingClientRect().bottom;
  return (
    elementTop >= document.documentElement.clientHeight || elementBottom < 0
  )
}
//show element
function displayScrollElement(el) {
  el.classList.add("scrolled");
}
//hide element
function hideScrollElement(el) {
  el.classList.remove("scrolled");
}
function handleScrollAnimation() {
  console.log('eventcalled')
  scrollElements.forEach((el) => {
    if (elementInView(el, .5)) {
      displayScrollElement(el)
    } else if (elementOutOfView(el)) {
      hideScrollElement(el)
    }
  }
  )
}
//UTILITY
// throttle - fn = function to call, wait = interval in ms
function throttle(fn, wait) {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
//BUTTON FUNCTION
// when the user clicks on the button, it will scroll to the top of the document
let button = document.getElementById("myBtn");
button.addEventListener('click', function(){ 
  console.log('clicked')
});
function topFunction(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}