/*=========================================================
FILE : app.js
MODULE : Core Application
VERSION : V3.1
=========================================================*/

"use strict";


/*=========================================================
DATABASE
=========================================================*/

let journal = {};

const today = new Date();
let currentDate = today.toISOString().split("T")[0];

/*=========================================================
LOAD DATABASE FROM SERVER
=========================================================*/

async function loadDatabase(){

    try{

        const { data } = await client.auth.getUser();

        const user = data.user;

if (!user) {

    window.location.href = "login.html";

    return;

}

const response = await fetch("/api/trades?user_id=" + user.id);

        journal = await response.json();

    }
    catch(err){

        console.error("Database Load Error:", err);

        journal = {};

    }

}

