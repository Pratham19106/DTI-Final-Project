const CORRECT_OTP = "2113";

const otpForm = document.querySelector('.form');
const otpInputs = document.querySelectorAll('.otp-container input');
const verifyButton = document.querySelector('.verifyBtn');

otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1) {
            if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

function verifyOTP(enteredOTP) {
    if (enteredOTP === CORRECT_OTP) {
        gsap.to('.cont-ls', {
            scale: 1.05,
            duration: 0.3,
            backgroundColor: '#4CAF50',
            onComplete: () => {
                // Prevent default form behavior and redirect
                setTimeout(() => {
                    window.location.replace('pratham/landing.html');
                }, 500);
            }
        });
    } else {
        gsap.to('.cont-ls', {
            x: [-10, 10, -10, 10, 0],
            duration: 0.4,
            backgroundColor: '#ff4444',
            onComplete: () => {
                gsap.to('.cont-ls', {
                    backgroundColor: '#ffffff',
                    duration: 0.4
                });
                otpInputs.forEach(input => input.value = '');
                otpInputs[0].focus();
            }
        });
    }
}

// Update form submission handler
document.querySelector('.otp-form').addEventListener('submit', function(e) {
    // Prevent the default form submission
    e.preventDefault();
    
    // Get OTP value and verify
    const enteredOTP = Array.from(otpInputs)
        .map(input => input.value)
        .join('');
    
    // Call verify function
    verifyOTP(enteredOTP);
    
    // Return false to ensure form doesn't submit
    return false;
});

document.getElementById('b002').addEventListener('click', () => {

    otpInputs.forEach(input => input.value = '');
    otpInputs[0].focus();

    gsap.to('#b002', {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
});

document.getElementById('b001').addEventListener('click', () => {
    window.location.href = 'page1.html';
});

document.getElementById('year').textContent = new Date().getFullYear();