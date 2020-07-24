let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //Initiate the controller
  controller = new ScrollMagic.Controller();

  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelectorAll(".nav-header");

  slides.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    const slideTl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.5");

    //New scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);

    const pageTl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
const body = document.querySelector("body");
function cursor(e) {
  mouse.style.top = e.clientY + "px";
  mouse.style.left = e.clientX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (
    item.id === "logo" ||
    item.classList.contains("burger") ||
    item.classList.contains("line1") ||
    item.classList.contains("line2") ||
    item.classList.contains("logo-span")
  ) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore") || item.classList.contains("beat")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Click";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
  // if (item.classList.contains("beat")) {
  //   mouse.classList.add("explore-active");
  //   mouseTxt.innerText = "Click";
  // } else {
  //   mouse.classList.remove("explore-active");
  //   mouseTxt.innerText = "";
  // }
  if (item.classList.contains("logo-span")) {
    gsap.to(".logo-span", 0.5, { color: "white" });
  } else {
    gsap.to(".logo-span", 0.5, { color: "rgb(255, 139, 93)" });
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, width: "3rem", background: "black" });
    gsap.to("#logo", 0.5, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    gsap.to(".logo-span", 1, { color: "black" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, width: "2rem", background: "white" });
    gsap.to("#logo", 0.5, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to(".logo-span", 1, { color: "rgb(255, 139, 93)" });
    document.body.classList.remove("hide");
  }
}

// function navToggleMobile(e) {
//   if (!e.target.classList.contains("active")) {
//     e.target.classList.add("active");
//     gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
//     gsap.to(".line2", 0.5, { rotate: "-45", y: -5, width: "3rem", background: "black" });
//     gsap.to("#logo", 0.5, { color: "black" });
//     gsap.to(".nav-bar", 1, { clipPath: "circle(1000px at 100% -10%)" });
//     gsap.to(".logo-span", 1, { color: "black" });
//     document.body.classList.add("hide");
//   } else {
//     e.target.classList.remove("active");
//     gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
//     gsap.to(".line2", 0.5, { rotate: "0", y: 0, width: "2rem", background: "white" });
//     gsap.to("#logo", 0.5, { color: "white" });
//     gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
//     gsap.to(".logo-span", 1, { color: "rgb(255, 139, 93)" });
//     document.body.classList.remove("hide");
//   }
// }

function navCursor(e) {
  const logo = document.getElementById("logo");
  if (burger.classList.contains("active")) {
    logo.style.cursor = "pointer";
    body.style.cursor = "auto";
    burger.style.cursor = "pointer";
  } else {
    body.style.cursor = "none";
    logo.style.cursor = "none";
    burger.style.cursor = "none";
  }
}

//Barba Page Transitions
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "beat",
      beforeEnter() {
        logo.href = "../index.html";
      },
    },
    {
      namespace: "color",
      beforeEnter() {
        logo.href = "../index.html";
      },
    },
    {
      namespace: "todo",
      beforeEnter() {
        logo.href = "../index.html";
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(".swipe", 0.5, { x: "-100%" }, { x: "0%", onComplete: done }, "-=0.5");
      },
      enter({ current, next }) {
        let done = this.async();

        window.scrollTo(0, 0);
        //Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(".swipe", 0.5, { x: "0%" }, { x: "100%", stagger: 0.2, onComplete: done });
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(".nav-header", 1, { y: "-100%" }, { y: "0%", ease: "power2.inOut" }, "-=1.5");
      },
    },
  ],
});

//Event Listeners

// burger.addEventListener("click", navToggleMobile);
burger.addEventListener("click", navToggle);
window.addEventListener("mouseover", navCursor);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
