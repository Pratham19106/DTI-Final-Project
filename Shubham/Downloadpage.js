const drop = document.querySelector(".drop");
const subMenu = document.querySelector(".subMenu");
let tl = gsap.timeline();
let loading = () => tl.to(".subMenu", {
  onStart: () => {
    tl.to(".subMenu", {
      display: "flex",
      opacity: 0,
      height: "0vh",
    })

    tl.to(subMenu, {
      opacity: 1,
      height: "35vh",
      duration: 0.2,
      ease: "power2.out"
    });

  }
});
let hiding = () => tl.to(".subMenu", {
  onComplete: () => {
    if (!drop.matches(':hover') && !subMenu.matches(':hover')) {
      subMenu.style.display = "none";
      subMenu.style.height = "0px";
    }
    tl.to(subMenu, {
      opacity: 0,
      height: "0vh",
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        subMenu.style.display = "none";
        subMenu.style.height = "0px";
      }
    });
  }
});



const hover = gsap.to(drop, {
  yPercent: -20,
  opacity: 0,
  paused: true,
  duration: 0.3,
  onStart: loading,
  onReverseComplete: hiding,
});

drop.addEventListener("mouseenter", () => hover.play());
drop.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!subMenu.matches(':hover')) {
      hover.reverse();
    }
  }, 100);
});

subMenu.addEventListener("mouseleave", () => {
  hover.reverse();
});
