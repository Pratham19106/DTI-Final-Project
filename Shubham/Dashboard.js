document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeCharts();
    initializeCards();
});

// Navigation Functions
function initializeNavigation() {
    const drop = document.querySelector(".drop");
    const subMenu = document.querySelector(".subMenu");
    let tl = gsap.timeline();

    const showSubmenu = () => {
        gsap.to(subMenu, {
            display: "flex",
            opacity: 1,
            height: "35vh",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const hideSubmenu = () => {
        if (!drop.matches(':hover') && !subMenu.matches(':hover')) {
            gsap.to(subMenu, {
                opacity: 0,
                height: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => subMenu.style.display = "none"
            });
        }
    };

    drop.addEventListener("mouseenter", showSubmenu);
    drop.addEventListener("mouseleave", hideSubmenu);
    subMenu.addEventListener("mouseleave", hideSubmenu);
}

// Card Functions
function initializeCards() {
    document.querySelectorAll('.card').forEach(card => {
        const toggleBtn = card.querySelector('.toggle-btn');
        const icon = toggleBtn.querySelector('i');
        const cardBody = card.querySelector('.cardbody');
        
        toggleBtn.addEventListener('click', () => {
            const isExpanded = !cardBody.classList.contains('closed');
            toggleCardState(cardBody, icon, isExpanded);
            addRippleEffect(toggleBtn);
        });
    });
}

function toggleCardState(cardBody, icon, isExpanded) {
    gsap.to(cardBody, {
        height: isExpanded ? 0 : 'auto',
        opacity: isExpanded ? 0 : 1,
        duration: 0.3,
        ease: "power2.inOut",
        onStart: () => {
            if (!isExpanded) cardBody.style.display = 'block';
        },
        onComplete: () => {
            if (isExpanded) cardBody.style.display = 'none';
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        }
    });
}

function addRippleEffect(button) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

// Chart Functions
function initializeCharts() {
    createAttendanceChart();
    createPerformanceChart();
    initializeChartAnimations();
}

function createAttendanceChart() {
    new Chart(document.getElementById('attendanceChart'), {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent', 'Late'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: ['#4CAF50', '#f44336', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function createPerformanceChart() {
    new Chart(document.getElementById('marksChart'), {
        type: 'bar',
        data: {
            labels: ['Math', 'Physics', 'Chemistry', 'CS'],
            datasets: [{
                label: 'Marks',
                data: [78, 85, 72, 90],
                backgroundColor: '#e64a19'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

function initializeChartAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChartEntry(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.chart-container').forEach(chart => {
        observer.observe(chart);
    });
}

function animateChartEntry(element) {
    gsap.from(element, {
        duration: 0.8,
        opacity: 0,
        y: 50,
        scale: 0.9,
        ease: "power2.out"
    });
};
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