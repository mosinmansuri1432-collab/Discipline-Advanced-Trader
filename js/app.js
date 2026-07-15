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

        const response = await fetch("/api/trades");

        journal = await response.json();

    }
    catch(err){

        console.error("Database Load Error:", err);

        journal = {};

    }

}

document.addEventListener('DOMContentLoaded', () => {
    // ID ki jagah class ".analytics-btn" ka use karein
    const buttons = document.querySelectorAll('.analytics-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Button ka 'data-dashboard' attribute check karein
            const panelId = this.getAttribute('data-dashboard');
            const panel = document.getElementById(panelId);

            if (panel) {
                // Panel ko toggle karein
                panel.classList.toggle('active');
            } else {
                console.warn("Panel nahi mila:", panelId);
            }
        });
    });
});