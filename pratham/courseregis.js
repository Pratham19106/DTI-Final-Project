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




document.querySelectorAll('.card').forEach(section => {
  const Pplus = section.querySelector('.fa-plus, .fa-minus');
  const cardBody = section.querySelector('.cardbody');

  const tl = gsap.timeline({ paused: true });
  tl.to(cardBody, {
      duration: 0.2,
      opacity: 1,
      height: "auto",
  });

  Pplus.addEventListener("click", function () {
      const icon = this;

      if (icon.classList.contains('fa-plus')) {
          tl.play(); 
          icon.classList.replace('fa-plus', 'fa-minus');
      } else {
          tl.reverse(); 
          icon.classList.replace('fa-minus', 'fa-plus');
      }
  });
});



document.addEventListener('input', function (e) {
  if (e.target.classList.contains('value') && e.target.contentEditable === 'true') {
    const key = e.target.previousElementSibling.textContent;

    if (key.includes('Mob')) {
      e.target.textContent = e.target.textContent.replace(/[^0-9]/g, '').slice(0, 10);
    } else if (key.includes('Email')) {

    }
  }
});


document.getElementById('photoUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 100 * 1024) { 
      alert('File size must be less than 100KB');
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('photoPreview').src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

document.getElementById('signUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('signPreview').src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

const dropdown = document.querySelector(".dropdown");
const dropdownMenu = document.querySelector(".dropdown-menu");
let isDropdownOpen = false;

// Open dropdown on click
dropdown.addEventListener("click", (e) => {
    // Prevent default only if the target is the dropdown toggle, not the links
    if (e.target.classList.contains("dropdown-toggle") || e.target.closest(".dropdown-toggle")) {
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
        } else {
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
