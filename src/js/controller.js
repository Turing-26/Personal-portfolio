"use strict";
const nav = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav__item");
const header = document.querySelector(".header");
const heading = document.querySelector(".header__heading");
const colorBg = document.querySelector(".header__color");
const headerRect = header.getBoundingClientRect();
// const elements = document.getElementsByClassName("txt-rotate");
const elements = document.querySelector(".txt__rotate");
const body = document.querySelector("body");
const about = document.querySelector(".section__about");
const aboutHd = document.querySelector(".about__heading");
const aboutIn = document.querySelector(".about__info");
const skills = document.querySelector(".section__skills");
const skillsHd = document.querySelector(".skills__heading");
const skillsTb = document.querySelector(".skills__table");
const skillBars = document.querySelectorAll(".skills__bar--filled");
const footer = document.querySelector(".footer");
const footerCon = document.querySelector(".footer__content");

document.querySelector(".nav__btn").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(document.querySelector(".nav__container").dataset.active);
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

const handleClick = function (event) {
  // event.preventDefault();
  document.querySelector(".nav__container").dataset.active = "off";
};

// Passing an argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
navItems.forEach((item) => item.addEventListener("click", handleClick.bind()));
let typewriter;

const animateHeader = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    colorBg.classList.add("scroll");

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

const animateAbout = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    about.classList.add("scroll");
    aboutHd.classList.add("scroll");
    aboutIn.classList.add("scroll");
    skillBars.forEach((el) => {
      el.classList.add("scroll");
    });
    observer.unobserve(entry.target);
  } else {
    about.classList.remove("scroll");
    aboutHd.classList.remove("scroll");
    aboutIn.classList.remove("scroll");
  }
};

const aboutObserver = new IntersectionObserver(animateAbout, {
  root: null,
  threshold: 0.3,
  rootMargin: "0% 0% 0% 0%",
});

aboutObserver.observe(about);

const animateSkills = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    skillsHd.classList.add("scroll");
    skillsTb.classList.add("scroll");
    observer.unobserve(entry.target);
  } else {
    skillsHd.classList.remove("scroll");
    skillsTb.classList.remove("scroll");
  }
};

const skillObserver = new IntersectionObserver(animateSkills, {
  root: null,
  threshold: 0.3,
  rootMargin: "0% 0% 0% 0%",
});

skillObserver.observe(skills);

const animateFooter = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    footerCon.classList.add("scroll");
  } else {
    footerCon.classList.remove("scroll");
  }
};

const footerObserver = new IntersectionObserver(animateFooter, {
  root: null,
  threshold: 0.4,
  rootMargin: "0% 0% 0% 0%",
});

footerObserver.observe(footer);

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
