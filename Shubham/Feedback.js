
const teacherData = [
    {
        id: 'SP001',
        name: 'Sneha Pandey',
        photo: 'SP.jpeg',
        department: 'Computer and Information Technology',
        subject: 'Design and Thinking lab(DTI)'
    },
    {
        id: 'GS001',
        name: 'Gaurav Sawant',
        photo: 'GS.jpeg',
        department: 'Computer and Information Technology',
        subject: 'Engineering Mathematics'
    },
    {
        id: 'SR001',
        name: 'Shikha Rathod',
        photo: 'SR.jpeg',
        department: 'Physics',
        subject: 'Engineering Physics'
    },
    {
        id: 'PS001',
        name: 'Prachi Shinde',
        photo: 'PS.jpeg',
        department: 'Computer and Information Technology',
        subject: 'Data Structures and Algorithms'
    },
    {
        id: 'NH001',
        name: 'Nikhil Handa',
        photo: 'NH.jpeg',
        department: 'Computer and Information Technology',
        subject: 'Computer Organization'
    },
    {
        id: 'WR001',
        name: 'W. S. Rathod',
        photo: 'DR.jpeg',
        department: 'Mechanical',
        subject: 'Design and Thinking lab(DTI)'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.form-container');
    container.innerHTML = ''; // Clear existing content

    teacherData.forEach(teacher => {
        container.appendChild(createTeacherSection(teacher));
    });

    initializeStarRatings();
    initializeFormSubmissions();
});

function createTeacherSection(teacher) {
    const section = document.createElement('div');
    section.className = 'teacher-section';
    section.innerHTML = `
        <div class="profile-card">
            <div class="avatar" style="background-image: url('${teacher.photo}');"></div>
            <div class="profile-info">
                <p><strong><h2>${teacher.name}</h2></strong></p>
                <p><strong>Department: ${teacher.department}</strong></p>
                <p><strong>Subject: ${teacher.subject}</strong></p>
            </div>
        </div>

        <div class="card">
            <div class="cardHeader">
                <h2>Faculty Feedback Form</h2>
            </div>
            <div class="cardContent">
                <form id="feedbackForm-${teacher.id}" class="feedback-form">
                    ${createFeedbackQuestions()}
                    <div class="form-group">
                        <label>Any suggestions for improvement?</label>
                        <textarea name="suggestions" rows="4" placeholder="Enter your suggestions here..."></textarea>
                    </div>
                    <button type="submit" class="btn">Submit Feedback</button>
                </form>
            </div>
        </div>
    `;
    return section;
}

function createFeedbackQuestions() {
    const questions = [
        'Clarity in explaining concepts',
        'Use of examples and real-life applications',
        'Clears doubts patiently and effectively',
        'Helps in understanding mistakes and improvement',
        'Shows strong command over the subject',
        'Maintains professionalism in interactions',
        'Encourages learning beyond the textbook',
        'Assignments and exams are relevant and fair'
    ];

    return questions.map((question, index) => `
        <div class="form-group">
            <label>${question}</label>
            <div class="star-rating">
                <i class="far fa-star" data-rating="1"></i>
                <i class="far fa-star" data-rating="2"></i>
                <i class="far fa-star" data-rating="3"></i>
                <i class="far fa-star" data-rating="4"></i>
                <i class="far fa-star" data-rating="5"></i>
                <input type="hidden" name="rating_${index}" value="0">
            </div>
        </div>
    `).join('');
}


document.addEventListener('DOMContentLoaded', () => {
    const starGroups = document.querySelectorAll('.star-rating');
    const form = document.getElementById('feedbackForm');

    // Star rating functionality
    function handleStarRating(stars, input) {
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const isStarFilled = star.classList.contains('fa-solid');
                updateStars(stars, index, !isStarFilled);
                input.value = isStarFilled ? 0 : index + 1;
            });

            // Hover effects
            star.addEventListener('mouseenter', () => handleStarHover(star, true));
            star.addEventListener('mouseleave', () => handleStarHover(star, false));
        });
    }

    function updateStars(stars, selectedIndex, fill) {
        stars.forEach((s, i) => {
            if (i <= selectedIndex) {
                const animation = fill ? fillStarAnimation(s, i) : unfillStarAnimation(s);
                s.classList.toggle('fa-solid', fill);
                s.classList.toggle('fa-regular', !fill);
                animation();
            }
        });
    }

    function fillStarAnimation(star, index) {
        return () => {
            gsap.fromTo(star,
                { scale: 0.5, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    color: '#FFD700',
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                }
            );
        };
    }

    function unfillStarAnimation(star) {
        return () => {
            gsap.to(star, {
                scale: 1,
                color: 'transparent',
                duration: 0.3,
                ease: 'power2.out'
            });
        };
    }

    function handleStarHover(star, isEntering) {
        if (!star.classList.contains('fa-solid')) {
            gsap.to(star, {
                scale: isEntering ? 1.2 : 1,
                color: isEntering ? '#FFD700' : 'transparent',
                opacity: isEntering ? 0.5 : 1,
                duration: 0.2
            });
        }
    }

    // Initialize star ratings
    starGroups.forEach(group => {
        const stars = group.querySelectorAll('i');
        const input = group.querySelector('input[type="hidden"]');
        handleStarRating(stars, input);
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(e) {
        e.preventDefault();

        // Validate form
        const ratings = [...form.querySelectorAll('input[type="hidden"]')]
            .map(input => parseInt(input.value));

        if (ratings.some(rating => rating === 0)) {
            showMessage('Please complete all ratings', 'error');
            return;
        }

        showMessage('Thank you for your feedback!', 'success');
        resetForm();
    }

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}-message`;
        message.textContent = text;
        document.body.appendChild(message);

        gsap.fromTo(message,
            { y: -50, opacity: 0 },
            {
                y: 20,
                opacity: 1,
                duration: 0.5,
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to(message, {
                            opacity: 0,
                            y: -50,
                            duration: 0.5,
                            onComplete: () => message.remove()
                        });
                    }, 2000);
                }
            }
        );
    }

    function resetForm() {
        form.reset();
        document.querySelectorAll('.fa-solid').forEach(star => {
            star.classList.remove('fa-solid');
            star.classList.add('fa-regular');
            star.style.color = 'transparent';
        });
    }
});


































document.addEventListener('DOMContentLoaded', () => {
    initializeStarRatings();
    initializeFormSubmission();
});

function initializeFormSubmission() {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const ratings = [...form.querySelectorAll('input[type="hidden"]')]
        .map(input => parseInt(input.value));

    if (ratings.some(rating => rating === 0)) {
        showAlert('Please complete all ratings before submitting', 'error');
        return;
    }

    showAlert('Thank you! Your feedback has been submitted successfully', 'success');
    setTimeout(() => {
        form.reset();
        resetStars();
    }, 2000);
}

function showAlert(message, type) {
    const alert = createAlertElement(message, type);
    document.body.appendChild(alert);
    animateAlert(alert, type);
}

