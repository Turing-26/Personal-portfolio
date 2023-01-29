"use strict";

document.querySelector(".nav__btn").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(document.querySelector(".nav__container").dataset.active);
  document.querySelector(".nav__container").dataset.active === "off"
    ? (document.querySelector(".nav__container").dataset.active = "on")
    : (document.querySelector(".nav__container").dataset.active = "off");
});

const nav = document.querySelector(".nav");
const handleHover = function (event /*,opacity*/) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".header__bar").querySelector("svg");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing an argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

const header = document.querySelector(".header");
const heading = document.querySelector(".header__heading");
const colorBg = document.querySelector(".header__color");
const headerRect = header.getBoundingClientRect();

const animateHeader = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    console.log("firing");
    colorBg.classList.add("scroll");
  } else colorBg.classList.remove("scroll");
};

const headerObserver = new IntersectionObserver(animateHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-50% 0% 0% 0%`, // a margin for the distance before the percentage where the function is executed
});

headerObserver.observe(heading);
/* transform 1000ms cubic-bezier(0.7, 0, 0.3, 1) 0ms; */
