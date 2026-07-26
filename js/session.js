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

}

checkSession();


