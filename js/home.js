/**
 * Home page animations (GSAP)
 * Intro timeline + ambient loops + pointer interactions.
 */

// Wraps every word of an element in .word > .word-inner, keeping child elements (e.g. .accent)
function splitWords(element) {
  const words = [];

  function walk(node) {
    Array.from(node.childNodes).forEach(function (child) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
        return;
      }
      if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return;

      const fragment = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(" "));
          return;
        }
        const word = document.createElement("span");
        const inner = document.createElement("span");
        word.className = "word";
        inner.className = "word-inner";
        inner.textContent = part;
        word.appendChild(inner);
        fragment.appendChild(word);
        words.push(inner);
      });
      child.replaceWith(fragment);
    });
  }

  walk(element);
  return words;
}

// Prepares SVG strokes so they can be "drawn" by tweening strokeDashoffset to 0
function prepareStrokes(svgs) {
  const shapes = [];
  svgs.forEach(function (svg) {
    svg.querySelectorAll("path, circle").forEach(function (shape) {
      const length = shape.getTotalLength();
      shape.style.strokeDasharray = length;
      shape.style.strokeDashoffset = length;
      shapes.push(shape);
    });
  });
  return shapes;
}

// Swappable things shown in the floating chips
const TRADE_ITEMS = [
  ["🛋️", "Sillón"],
  ["🚲", "Bici"],
  ["🪑", "Silla"],
  ["🎮", "Play"],
  ["📚", "Libros"],
  ["🎸", "Guitarra"],
  ["👟", "Zapatillas"],
  ["🧥", "Campera"],
  ["🪴", "Planta"],
  ["📷", "Cámara"],
  ["🛹", "Skate"],
  ["🧸", "Peluche"],
  ["🎧", "Auriculares"],
  ["💻", "Notebook"],
  ["⚽", "Pelota"],
  ["🍳", "Sartén"],
  ["🧩", "Rompecabezas"],
  ["🎲", "Juego de mesa"],
  ["🪞", "Espejo"],
  ["💡", "Lámpara"],
  ["🛴", "Monopatín"],
  ["⌚", "Reloj"],
  ["👜", "Cartera"],
  ["🖼️", "Cuadro"],
  ["📻", "Radio"],
  ["🎨", "Pinturas"],
  ["🏓", "Paletas"],
  ["⛺", "Carpa"],
  ["🎒", "Mochila"],
  ["📱", "Celular"],
];

// Returns a function that yields items in shuffled order, reshuffling when the deck runs out
function itemDeck() {
  let deck = [];
  return function () {
    if (!deck.length) deck = gsap.utils.shuffle(TRADE_ITEMS.slice());
    return deck.pop();
  };
}

function setChip(chip, item) {
  const emoji = document.createElement("span");
  emoji.textContent = item[0];
  chip.replaceChildren(emoji, " " + item[1]);
}

function introTimeline() {
  const title = document.querySelector(".hero-title");
  const words = splitWords(title);
  const strokes = prepareStrokes(document.querySelectorAll(".feature-icon svg"));

  gsap.set([".navbar", ".hero-card"], { autoAlpha: 1 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".navbar", { yPercent: -100, duration: 0.7 })
    .from(
      ".hero-card",
      { y: 60, scale: 0.94, autoAlpha: 0, duration: 1, ease: "expo.out" },
      "-=0.4"
    )
    .from(words, { yPercent: 110, rotate: 6, duration: 0.9, stagger: 0.06 }, "-=0.6")
    .from(".hero-subtitle", { y: 20, autoAlpha: 0, duration: 0.7 }, "-=0.5")
    .from(
      ".store-buttons a",
      { y: 24, scale: 0.8, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "back.out(2)" },
      "-=0.45"
    )
    .addLabel("visual", 0.6)
    .from(".hero-blob", { scale: 0, duration: 1.2, ease: "elastic.out(1, 0.6)" }, "visual")
    .from(
      ".app-mockup",
      { y: 140, rotate: 8, autoAlpha: 0, duration: 1.1, ease: "back.out(1.4)" },
      "visual+=0.15"
    )
    .from(
      ".trade-chip",
      { scale: 0, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: "back.out(3)" },
      "visual+=0.7"
    )
    .from(
      ".feature-item",
      { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
      "-=0.6"
    )
    .to(strokes, { strokeDashoffset: 0, duration: 1, stagger: 0.05, ease: "power2.inOut" }, "<");

  return tl;
}

function ambientLoops() {
  // Morphing, slowly rotating blob
  gsap.to(".hero-blob", {
    borderRadius: "62% 38% 33% 67% / 55% 35% 65% 45%",
    duration: 4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(".hero-blob", { rotate: 360, duration: 30, ease: "none", repeat: -1 });

  // Floating phone
  // yPercent so it doesn't fight the intro tween on y
  gsap.to(".app-mockup", {
    yPercent: -4,
    duration: 2.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  // Chips swap places (the trueque, literally), then pop out and come back as a new pair
  const chipA = document.querySelector(".trade-chip--a");
  const chipB = document.querySelector(".trade-chip--b");
  if (chipA && chipB) {
    const nextItem = itemDeck();

    const swapCycle = function (delay) {
      const dx = chipB.offsetLeft - chipA.offsetLeft;
      const dy = chipB.offsetTop - chipA.offsetTop;

      gsap
        .timeline({ delay: delay, onComplete: swapCycle, onCompleteParams: [1.2] })
        .to(chipA, { x: dx, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(chipA, { y: dy, duration: 1.1, ease: "power3.in" }, 0)
        .to(chipB, { x: -dx, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(chipB, { y: -dy, duration: 1.1, ease: "power3.out" }, 0)
        .to([chipA, chipB], { scale: 1.12, duration: 0.55, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0)
        .to([chipA, chipB], { scale: 0, autoAlpha: 0, duration: 0.3, stagger: 0.08, ease: "back.in(2)" }, "+=1.6")
        .call(function () {
          setChip(chipA, nextItem());
          setChip(chipB, nextItem());
          gsap.set([chipA, chipB], { x: 0, y: 0 });
        })
        .to([chipA, chipB], { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.12, ease: "back.out(3)" });
    };

    swapCycle(3);
  }

  // Slow drift of the page background pattern
  // 160px is a multiple of the 1rem tile, so the loop is seamless
  gsap.fromTo(document.body, { backgroundPosition: "0px 0px" }, {
    backgroundPosition: "160px -160px",
    duration: 40,
    ease: "none",
    repeat: -1,
  });
}

function pointerInteractions() {
  if (!window.matchMedia("(hover: hover)").matches) return;

  // 3D tilt of the phone following the cursor
  const visual = document.querySelector(".hero-visual");
  const phone = document.querySelector(".app-mockup");
  if (visual && phone) {
    const rotY = gsap.quickTo(phone, "rotationY", { duration: 0.6, ease: "power3.out" });
    const rotX = gsap.quickTo(phone, "rotationX", { duration: 0.6, ease: "power3.out" });
    const blobX = gsap.quickTo(".hero-blob", "x", { duration: 1, ease: "power3.out" });
    const blobY = gsap.quickTo(".hero-blob", "y", { duration: 1, ease: "power3.out" });

    visual.addEventListener("mousemove", function (e) {
      const rect = visual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * 18);
      rotX(-py * 14);
      blobX(-px * 30);
      blobY(-py * 30);
    });
    visual.addEventListener("mouseleave", function () {
      rotY(0);
      rotX(0);
      blobX(0);
      blobY(0);
    });
  }

  // Subtle lift on store buttons
  document.querySelectorAll(".store-buttons a").forEach(function (button) {
    button.addEventListener("mouseenter", function () {
      gsap.to(button, { y: -3, scale: 1.02, duration: 0.25, ease: "power2.out" });
    });
    button.addEventListener("mouseleave", function () {
      gsap.to(button, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Feature icons spin + bounce on hover
  document.querySelectorAll(".feature-item").forEach(function (item) {
    const icon = item.querySelector(".feature-icon");
    item.addEventListener("mouseenter", function () {
      gsap.fromTo(icon, { rotate: 0 }, { rotate: 360, duration: 0.7, ease: "back.out(1.6)" });
      gsap.fromTo(icon, { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const reveal = document.querySelectorAll(".navbar, .hero-card");

  // GSAP failed to load: just show the page
  if (typeof gsap === "undefined") {
    reveal.forEach(function (el) {
      el.style.visibility = "visible";
    });
    return;
  }

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", function () {
    introTimeline();
    ambientLoops();
    pointerInteractions();
  });

  mm.add("(prefers-reduced-motion: reduce)", function () {
    gsap.set(reveal, { autoAlpha: 1 });
  });
});
