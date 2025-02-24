document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("form")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default form submission

      // Get form values and trim whitespace where applicable
      const name = document.querySelector("input[name='name']").value.trim();
      const father_name = document
        .querySelector("input[name='father_name']")
        .value.trim();
      const mother_name = document
        .querySelector("input[name='mother_name']")
        .value.trim();
      const email = document.querySelector("input[name='email']").value.trim();
      const mobile = document
        .querySelector("input[name='mobile']")
        .value.trim();
      const aadhaar = document
        .querySelector("input[name='aadhaar']")
        .value.trim();
      const dob = document.querySelector("input[name='dob']").value;
      const gender = document.querySelector("select[name='gender']").value;
      const nationality = document
        .querySelector("input[name='nationality']")
        .value.trim();
      const blood_group = document.querySelector(
        "select[name='blood_group']"
      ).value;
      const password = document.querySelector("input[name='password']").value;
      const confirmPassword = document.querySelector(
        "input[name='confirm_password']"
      ).value;

      // **Client-side validation**
      // Check for required fields
      if (!name || !email || !mobile || !password) {
        alert(
          "Please fill in all required fields: Name, Email, Mobile, and Password."
        );
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Optional: Validate mobile number (e.g., 10 digits)
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      // **Send data to backend**
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            father_name,
            mother_name,
            email,
            mobile,
            aadhaar,
            dob,
            gender,
            nationality,
            blood_group,
            password_hash: password, // Renamed from 'password_hash' variable to 'password' for clarity
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Signup successful! Redirecting to filters page...");
          window.location.href = "filters.html"; // Redirect on success
        } else {
          alert(
            result.error ||
              "Signup failed. Please check your details and try again."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    });
});
