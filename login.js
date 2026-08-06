
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

    const { data: sessionData } = await client.auth.getUser();

const user = sessionData.user;

await fetch("/api/profile", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: user.id,
        name: user.user_metadata?.full_name || "User",
        email: user.email
    })
    
});

    window.location.href = "index.html";

});

