let controller;
let slideScene;
let pageScene;

function initiateController() {
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
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

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

function cursor(e) {
  let mouse = document.querySelector(".cursor");
  const body = document.querySelector("body");
  mouse.style.top = e.clientY + "px";
  mouse.style.left = e.clientX + "px";
  body.style.cursor = "none";
}

function activeCursor(e) {
  const item = e.target;
}

window.addEventListener("mousemove", cursor);

initiateController();
