console.log("Forgot.js Loaded");

/*=========================================================
FORGOT PASSWORD
=========================================================*/

const form = document.getElementById("forgotForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const { error } = await client.auth.resetPasswordForEmail(email, {

        redirectTo: "http://localhost:3000/reset.html"

    });

    if (error) {

        alert(error.message);
        return;

    }

    alert("Password reset link has been sent to your email.");

});document




























