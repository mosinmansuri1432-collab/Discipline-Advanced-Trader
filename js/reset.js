console.log("Reset.js Loaded");

/*=========================================================
RESET PASSWORD
=========================================================*/

const form = document.getElementById("resetForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");
        return;

    }

    const { error } = await client.auth.updateUser({

        password: password

    });

    if (error) {

        alert(error.message);
        return;

    }

    alert("Password updated successfully.");

    window.location.href = "login.html";

});