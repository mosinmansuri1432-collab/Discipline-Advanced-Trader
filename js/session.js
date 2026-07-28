/*=========================================================
SESSION CHECK
=========================================================*/

console.log("Session.js Loaded");

async function checkSession() {

    const { data, error } = await client.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

   if (!data.session) {

    window.location.href = "login.html";
    return;

}

console.log("User Logged In");
console.log(data.session.user);

const user = data.session.user;

const fullName =
    user.user_metadata.full_name || "User";

const firstName =
    fullName.split(" ")[0];

document.getElementById("userName").textContent =
    firstName;

document.getElementById("profileName").textContent =
    fullName;

document.getElementById("profileEmail").textContent =
    user.email;

}

checkSession();


