
console.log("Register.js Loaded");

/*=========================================================
REGISTER
=========================================================*/



const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    console.log("Register Button Clicked");

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

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

   const { data, error } = await client.auth.signUp({

    email,

    password,

    options: {

        emailRedirectTo: "http://localhost:3000/login.html",

        data: {

            full_name: name

        }

    }

});

    if (error) {

        alert(error.message);

        return;

    }
    

    
    alert("Account created successfully. Please login.");

    window.location.href = "login.html";

});

