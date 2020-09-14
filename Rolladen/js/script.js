const burger = document.querySelector(".menu__burger-wrapper"),
  menu = document.querySelector(".menu__items"),
  body = document.querySelector("body");

burger.addEventListener("click", function () {
  menu.classList.toggle("active");
  burger.classList.toggle("active");
  if (body.style.overflow == "hidden") {
    body.style.overflow = "auto";
  } else {
    body.style.overflow = "hidden";
  }
});
activeMenuItem();

function activeMenuItem () {
    let pageId = body.getAttribute("data-id-nav")
const menuItem = document.querySelectorAll('.menu__item')
menuItem.forEach(item=> {
    if (item.getAttribute("data-id-nav")===pageId) {
        item.classList.add("active")
    }
})
}
let nav = body.getAttribute("data-nav");

let pageId = body.getAttribute("data-id-nav")
if (pageId!== "leistungen" || nav=="single-service") {

  const mySwiper = new Swiper('.swiper-container', {
 
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    centerSlides: true,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  })
  
  const headerSlider = new Swiper('.slider__slide', {
    loop: true,
    autoplay: {
      delay: 5000
    },
    slidesPerView: 1,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  })

}

if (nav !== "single-service") {
  const servicesImg = document.querySelector(".services__img img"),
    sourceImg = document.querySelector(".services__img source"),
    tabItem = document.querySelectorAll(".services__item");
  tabItem.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      clearInterval(interval);
      tabItem.forEach((tab) => {
        tab.classList.remove("active");
      });
      item.classList.add("active");
      let id = this.getAttribute("data-img-id");
      sourceImg.setAttribute("srcset", `./img/tabs-img-${id}.webp`);
      servicesImg.setAttribute("src", `./img/tabs-img-${id}.jpg`);
    });
  });
  let i = 1;

  let interval = setInterval(toggleImg, 5000);
  toggleImg();
  function toggleImg() {
    if (i >= tabItem.length) {
      i = 0;
    }
    let item = tabItem[i];
    tabItem.forEach((tab) => {
      tab.classList.remove("active");
    });
    item.classList.add("active");
    let id = item.getAttribute("data-img-id");
    sourceImg.setAttribute("srcset", `./img/tabs-img-${id}.webp`);
    servicesImg.setAttribute("src", `./img/tabs-img-${id}.jpg`);
    i++;
  }
}

