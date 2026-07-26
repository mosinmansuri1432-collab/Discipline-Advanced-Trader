/*=========================================================
LOGOUT
=========================================================*/

console.log("Logout.js Loaded");

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

       const { error } = await client.auth.signOut();

if (error) {
    alert(error.message);
    return;
}

window.location.href = "login.html"; 

    });

}

