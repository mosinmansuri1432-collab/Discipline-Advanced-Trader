/*=========================================================
FILE : notes.js
MODULE : Daily Notes
VERSION : V3.1
=========================================================*/


/*=========================================================
NOTES
=========================================================*/

function loadNotes(){

const notes=journal[currentDate].notes;

document.getElementById("todayPlan").value=notes.todayPlan;

document.getElementById("tradeReview").value=notes.tradeReview;

document.getElementById("mistakes").value=notes.mistakes;

document.getElementById("lessons").value=notes.lessons;

document.getElementById("tomorrowPlan").value=notes.tomorrowPlan;

}

[
"todayPlan",
"tradeReview",
"mistakes",
"lessons",
"tomorrowPlan"

].forEach(id=>{

const el=document.getElementById(id);

el.addEventListener("input",()=>{

journal[currentDate].notes[id]=el.value;

saveDatabase();

});

});
