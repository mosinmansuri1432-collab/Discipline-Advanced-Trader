
/*=========================================================
CHECK EXISTING SESSION
=========================================================*/

async function checkLogin() {

    const { data, error } = await client.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

    if (data.session) {
        window.location.href = "index.html";
    }

}

checkLogin();

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { error } = await client.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    window.location.href = "index.html";

});

