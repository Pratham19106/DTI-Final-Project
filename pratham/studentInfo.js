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

document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.card');
    const values = card.querySelectorAll('.value');
    const icon = this.querySelector('i');
    
    values.forEach(value => {
      if (icon.classList.contains('fa-edit')) {
        value.contentEditable = true;
        value.classList.add('editing');
      } else {
        value.contentEditable = false;
        value.classList.remove('editing');
        // Save the changes here if needed
      }
    });

    if (icon.classList.contains('fa-edit')) {
      icon.classList.replace('fa-edit', 'fa-save');
    } else {
      icon.classList.replace('fa-save', 'fa-edit');
    }
  });
});

// Add validation for phone numbers and email
document.addEventListener('input', function(e) {
  if (e.target.classList.contains('value') && e.target.contentEditable === 'true') {
    const key = e.target.previousElementSibling.textContent;
    
    if (key.includes('Mob')) {
      e.target.textContent = e.target.textContent.replace(/[^0-9]/g, '').slice(0, 10);
    } else if (key.includes('Email')) {
      // Email validation can be added here if needed
    }
  }
});
