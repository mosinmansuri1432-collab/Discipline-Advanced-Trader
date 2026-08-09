

/*=========================================================
PREMIUM MODULE
=========================================================*/

function togglePremiumModule(

    moduleId,

    lockId,

    hasAccess

){

    document.getElementById(moduleId).style.display =
        hasAccess ? "block" : "none";

    document.getElementById(lockId).style.display =
        hasAccess ? "none" : "block";

}

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
window.currentUserId = user.id;


/*=========================================================
LOAD USER PROFILE
=========================================================*/

const response = await fetch(

    "/api/profile?user_id=" + user.id

);

const profile = await response.json();

window.currentUserProfile = profile;

/*=========================================================*
*ADMIN PANEL ACCESS*
*=========================================================*/

const adminPanelBtn = document.getElementById("adminPanelBtn");

if (adminPanelBtn) {

    if (profile.role === "admin") {

        adminPanelBtn.style.display = "block";

        adminPanelBtn.addEventListener("click", () => {
            window.location.href = "admin.html";
        });

    } else {

        adminPanelBtn.style.display = "none";

    }

}

const fullName =
    user.user_metadata.full_name ||
    user.user_metadata.name ||
    user.email.split("@")[0];

const firstName = fullName.split(" ")[0];

document.getElementById("userName").textContent =
    firstName;

document.getElementById("profileName").textContent =
    fullName;

document.getElementById("profileEmail").textContent =
    user.email;

/*=========================================================
PREMIUM ACCESS
=========================================================*/

const hasAccess =
    profile.role === "admin" ||
    profile.premium === true;

togglePremiumModule(

    "setupModule",

    "setupPremiumLock",

    hasAccess

);

togglePremiumModule(

    "disciplineModule",

    "disciplinePremiumLock",

    hasAccess

);

}

checkSession();

