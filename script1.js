
    function handleSubmit() {
        const name = document.getElementById('name').value.trim();
        const password = document.getElementById('password').value.trim();
        const mobile = document.getElementById('mobile').value.trim();

        const nameRegex = /^[A-Za-z ]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!name || !password || !mobile) {
            alert("Please fill all fields.");
            return;
        }

        if (!nameRegex.test(name)) {
            alert("Name must contain only letters.");
            return;
        }

        if (!mobileRegex.test(mobile)) {
            alert("Mobile number must be exactly 10 digits.");
            return;
        }

        alert("OTP sent to +91 " + mobile);
        window.location.href = "page2.html";
    }

