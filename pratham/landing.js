
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

  let display = () => {
    subMenu.style.display = "flex";
  };

  let hide = () => {
  
    if (!drop.matches(':hover') && !subMenu.matches(':hover')) {
      subMenu.style.display = "none";
    }
  };

  const hover = gsap.to(drop, {
    yPercent: -20,
    opacity: 0,
    paused: true,
    duration: 0.7,
    onStart: display,
    onReverseComplete: hide
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

