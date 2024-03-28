/**************** login form popuop *****************/
let navbar = document.querySelector('.header .navbar');
document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  loginForm.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
  loginForm.classList.toggle('active');
  navbar.classList.remove('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  loginForm.classList.remove('active');
}

/**************** read more button *****************/

document.getElementById('read-more').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default link behavior
  var extraContent = document.getElementById('extra-content');
  var readMoreButtonSpan = document.querySelector('#read-more'); // Get the button text span element

  if (extraContent.style.display === 'none') {
    extraContent.style.display = 'block';
    readMoreButtonSpan.textContent = 'Read Less'; // Update button text to "read less"
  } else {
    extraContent.style.display = 'none';
    readMoreButtonSpan.textContent = 'Read More'; // Update button text to "read more"
  }
});

/**************** student review swiper *****************/

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  grabCursor: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});




