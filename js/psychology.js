/*=========================================================
FILE : psychology.js
MODULE : Psychology System
VERSION : V3.1
=========================================================*/

/*=========================================================
PSYCHOLOGY
=========================================================*/

function loadPsychology(){

const p=journal[currentDate].psychology;

document.getElementById("fear").checked=p.fear;

document.getElementById("greed").checked=p.greed;

document.getElementById("fomo").checked=p.fomo;

document.getElementById("revenge").checked=p.revenge;

document.getElementById("overTrading").checked=p.overTrading;

document.getElementById("patience").checked=p.patience;

document.getElementById("followPlan").checked=p.followPlan;

document.getElementById("noEmotion").checked=p.noEmotion;

}

[
"fear",
"greed",
"fomo",
"revenge",
"overTrading",
"patience",
"followPlan",
"noEmotion"

].forEach(id=>{

document.getElementById(id)

.addEventListener("change",()=>{

journal[currentDate].psychology[id]=

document.getElementById(id).checked;

saveDatabase();

});

});