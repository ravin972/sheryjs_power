Shery.mouseFollower();

Shery.makeMagnet(".magnet-target" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

//   gsap

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// footer video

document
  .querySelector(".footer-text button")
  .addEventListener("mouseover", () => {
    gsap.to(".footer video", {
      opacity: 1,
      duration: 1,
      ease: Power3,
    });
  });

document
  .querySelector(".footer-text button")
  .addEventListener("mouseleave", () => {
    gsap.to(".footer video", {
      opacity: 0,
      duration: 0.8,
      ease: Power3,
    });
  });

var tl = gsap.timeline();

tl.from("#nav", {
  opacity: 0,
  delay: 0.2,
});

tl.from("#nav h1, #nav #route", {
  y: -80,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
});

tl.from(".paragraph p", {
  y: 80,
  opacity: 0,
  duration: 0.4,
  stagger: 0.2,
});
