"use strict";
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const heading = document.querySelector(".header__heading");
const colorBg = document.querySelector(".header__color");
const headerRect = header.getBoundingClientRect();
// const elements = document.getElementsByClassName("txt-rotate");
const elements = document.querySelector(".txt__rotate");

document.querySelector(".nav__btn").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(document.querySelector(".nav__container").dataset.active);
  document.querySelector(".nav__container").dataset.active === "off"
    ? (document.querySelector(".nav__container").dataset.active = "on")
    : (document.querySelector(".nav__container").dataset.active = "off");
});

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
let typewriter;

const animateHeader = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    console.log("firing");
    colorBg.classList.add("scroll");
    const elements = document.querySelector(".txt__rotate");

    const toRotate = elements.getAttribute("data-rotate");
    const period = elements.getAttribute("data-period");
    typewriter = new TxtRotate(elements, JSON.parse(toRotate), period);
  } else {
    colorBg.classList.remove("scroll");
    const el = document.querySelector("#cursor");
    if (el) el.remove();
    if (typewriter) typewriter.el = undefined;
    // console.log(typewriter);
  }
};

const headerObserver = new IntersectionObserver(animateHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-50% 0% 0% 0%`, // a margin for the distance before the percentage where the function is executed
});

headerObserver.observe(heading);
/* transform 1000ms cubic-bezier(0.7, 0, 0.3, 1) 0ms; */

const TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10);
  this.txt = "";
  if (this.el) this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  if (!this.el) return;
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = `${this.txt}<span id="cursor"></span>`;

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};
