

/*=========================================================
CALENDAR
=========================================================*/

const calendar=document.getElementById("calendar");

const calendarMonth=document.getElementById("calendarMonth");

const calendarYear=document.getElementById("calendarYear");

const prevMonth=document.getElementById("prevMonth");

const nextMonth=document.getElementById("nextMonth");

/*=========================================================
MONTHS
=========================================================*/

const months=[

"January",

"February",

"March",

"April",

"May",

"June",

"July",

"August",

"September",

"October",

"November",

"December"

];

/*=========================================================
YEAR LIST
=========================================================*/

for(let y=2024;y<=2055;y++){

const option=document.createElement("option");

option.value=y;

option.textContent=y;

calendarYear.appendChild(option);

}

/*=========================================================
MONTH LIST
=========================================================*/

months.forEach((month,index)=>{

const option=document.createElement("option");

option.value=index;

option.textContent=month;

calendarMonth.appendChild(option);

});

calendarMonth.value=today.getMonth();

calendarYear.value=today.getFullYear();

/*=========================================================
BUILD CALENDAR
=========================================================*/

function buildCalendar(){

calendar.innerHTML="";

/* Week Header */

const week=[

"Sun",

"Mon",

"Tue",

"Wed",

"Thu",

"Fri",

"Sat"

];

week.forEach(day=>{

const head=document.createElement("div");

head.className="calendar-head";

head.textContent=day;

calendar.appendChild(head);

});

const month=

Number(calendarMonth.value);

const year=

Number(calendarYear.value);

const firstDay=

new Date(year,month,1).getDay();

const totalDays=

new Date(year,month+1,0).getDate();

/* Empty */

for(let i=0;i<firstDay;i++){

const empty=document.createElement("div");

empty.className="calendar-empty";

calendar.appendChild(empty);

}

/* Days */

for(let day=1;day<=totalDays;day++){

const box=document.createElement("div");

box.className="calendar-day";

const date=

`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

box.dataset.date=date;

box.innerHTML=`<span>${day}</span>`;

/*=========================================================
COLOR
=========================================================*/

if(journal[date]){

let total=0;

journal[date].trades.forEach(trade=>{

total+=Number(trade.pl)||0;

});

if(total>0){

box.classList.add("calendar-profit");

}

else if(total<0){

box.classList.add("calendar-loss");

}

}

/*=========================================================
TODAY
=========================================================*/

if(date===currentDate){

box.style.outline="3px solid gold";

}

/*=========================================================
CLICK
=========================================================*/

box.addEventListener("click",()=>{

journalDate.value=date;

loadDay(date);

document.getElementById(

"selectedDateText"

).textContent=

"Selected : "+date;

});

calendar.appendChild(box);

}

}

/*=========================================================
PREVIOUS
=========================================================*/

prevMonth.addEventListener("click",()=>{

let month=

Number(calendarMonth.value);

let year=

Number(calendarYear.value);

month--;

if(month<0){

month=11;

year--;

}

calendarMonth.value=month;

calendarYear.value=year;

buildCalendar();

});

/*=========================================================
NEXT
=========================================================*/

nextMonth.addEventListener("click",()=>{

let month=

Number(calendarMonth.value);

let year=

Number(calendarYear.value);

month++;

if(month>11){

month=0;

year++;

}

calendarMonth.value=month;

calendarYear.value=year;

buildCalendar();

});

/*=========================================================
CHANGE
=========================================================*/

calendarMonth.addEventListener(

"change",

buildCalendar

);

calendarYear.addEventListener(

"change",

buildCalendar

);

/*=========================================================
FIRST LOAD
=========================================================*/

buildCalendar()

/*=========================================================
LOAD DAY FUNCTION
Ye function date badalne par sara data update karega
=========================================================*/
function loadDay(date) {
    currentDate = date; // Global date variable update karein

    // 1. Agar us din ka data nahi hai, toh empty object banayein
    if (!journal[currentDate]) {
        journal[currentDate] = { 
            trades: [], 
            notes: { todayPlan: "", tradeReview: "", mistakes: "", lessons: "", tomorrowPlan: "" }, 
            psychology: { fear: false, greed: false, fomo: false, revenge: false, overTrading: false, patience: false, followPlan: false, noEmotion: false }, 
            screenshots: {} 
        };
    }

    // 2. Sare modules ke load functions ko call karein
    // Ye functions aapki dusri files (trades.js, notes.js, etc.) mein hain
    if (typeof loadTrades === 'function') loadTrades();
    if (typeof loadNotes === 'function') loadNotes();
    if (typeof loadPsychology === 'function') loadPsychology();
    if (typeof loadScreenshots === 'function') loadScreenshots();
    
    console.log("Data loaded for:", currentDate);
}