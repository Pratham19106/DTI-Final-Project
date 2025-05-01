function updateDateTime() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[now.getDay()];

    const dateStr = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    document.getElementById("dayName").textContent = dayName.toUpperCase();
    document.getElementById("date").textContent = dateStr.toUpperCase();
    document.getElementById("time").textContent = timeStr;
  }

  updateDateTime(); 
  setInterval(updateDateTime, 1000); 
  
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.card').forEach(card => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power2.out',
      stager:1,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  }); 
  const list = document.querySelector("#noticeList");
  const items = list.querySelectorAll("li");

  items.forEach(item => {
    const clone = item.cloneNode(true);
    list.appendChild(clone);
  });

  gsap.to(list, {
    yPercent: -50,
    ease: "none",
    duration: 20,  
    repeat: -1
  });
  const drop = document.querySelector(".drop");
  const subMenu = document.querySelector(".subMenu");

  const showSubmenu = () => {
    subMenu.style.display = "flex";
    gsap.to(subMenu, {
        height: "35vh",
        duration: 0.1   ,
        ease: "power2.inOut"
    });
  };

  const hideSubmenu = () => {
    gsap.to(subMenu, {
        height: 0,
        duration: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
            subMenu.style.display = "none";
        }
    });
  };

  drop.addEventListener("mouseenter", showSubmenu);

  drop.addEventListener("mouseleave", (e) => {
    setTimeout(() => {
        if (!subMenu.matches(":hover")) {
            hideSubmenu();
        }
    }, 100);
  });

  subMenu.addEventListener("mouseleave", (e) => {
    if (!drop.matches(":hover")) {
        hideSubmenu();
    }
  });

  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  let isDropdownOpen = false;
  
  dropdown.addEventListener("click", (e) => {
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