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
  duration: 0.2,
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
const dropdown = document.querySelector(".dropdown");
const dropdownMenu = document.querySelector(".dropdown-menu");
let isDropdownOpen = false;

// Open dropdown on click
dropdown.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (!isDropdownOpen) {
        dropdownMenu.style.display = "flex";
        gsap.to(dropdownMenu, {
            opacity: 1,
            height: "auto",
            duration: 0.3,
            ease: "power2.inOut",
        });
        isDropdownOpen = true;
    }
});

// Close dropdown when mouse leaves the menu
dropdownMenu.addEventListener("mouseleave", () => {
    if (isDropdownOpen) {
        gsap.to(dropdownMenu, {
            opacity: 0,
            height: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
                dropdownMenu.style.display = "none";
            },
        });
        isDropdownOpen = false;
    }
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target) && isDropdownOpen) {
        gsap.to(dropdownMenu, {
            opacity: 0,
            height: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
                dropdownMenu.style.display = "none";
            },
        });
        isDropdownOpen = false;
    }
});
