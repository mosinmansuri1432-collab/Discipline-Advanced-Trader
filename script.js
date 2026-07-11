

/*=========================================================
DISCIPLINE ADVANCED TRADER JOURNAL V2
script.js
Part 1
=========================================================*/

"use strict";

/*=========================================================
DATABASE
=========================================================*/

let journal = {};

let currentDate = new Date().toISOString().split("T")[0];

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

/*=========================================================
DASHBOARD REPORTS
PART-1
GLOBAL VARIABLES
=========================================================*/

const dashboard = {

    totalTrades: 0,
    winningTrades: 0,
    losingTrades: 0,

    totalProfit: 0,
    totalLoss: 0,
    netPL: 0,

    winRate: 0,
    profitFactor: 0,

    averageWin: 0,
    averageLoss: 0,

    largestWin: 0,
    largestLoss: 0,

    score: 0

};

/*=========================================================
MONTH REPORT
=========================================================*/

const monthlyReport = {

    trades: 0,
    wins: 0,
    losses: 0,

    totalProfit: 0,
    totalLoss: 0,

    netPL: 0,

    winRate: 0,

    bestDay: "--",
    worstDay: "--"

};

/*=========================================================
SETUP REPORT
=========================================================*/

const setupReport = {

    A1: {

        trades: 0,
        wins: 0,
        losses: 0,
        pl: 0

    },

    A2: {

        trades: 0,
        wins: 0,
        losses: 0,
        pl: 0

    },

    B1: {

        trades: 0,
        wins: 0,
        losses: 0,
        pl: 0

    },

    B2: {

        trades: 0,
        wins: 0,
        losses: 0,
        pl: 0

    }

};

/*=========================================================
CHART VARIABLES
=========================================================*/

let equityChart = null;

let monthlyChart = null;

let winLossChart = null;

let setupChart = null;



/*=========================================================
ELEMENTS
=========================================================*/

const journalDate = document.getElementById("journalDate");

const session = document.getElementById("session");

const marketBias = document.getElementById("marketBias");

const tradeBody = document.getElementById("tradeBody");

const addTrade = document.getElementById("addTrade");

const saveTrade = document.getElementById("saveTrade");

/*=========================================================
DASHBOARD REPORTS
PART-2
DASHBOARD ELEMENTS
=========================================================*/

const dashboardReports =
document.getElementById("dashboardReports");

const performanceCharts =
document.getElementById("performanceCharts");

/*=========================
REPORT VALUES
=========================*/

const reportTotalTrades =
document.getElementById("reportTotalTrades");

const reportWinningTrades =
document.getElementById("reportWinningTrades");

const reportLosingTrades =
document.getElementById("reportLosingTrades");

const reportWinRate =
document.getElementById("reportWinRate");

const reportTotalProfit =
document.getElementById("reportTotalProfit");

const reportTotalLoss =
document.getElementById("reportTotalLoss");

const reportNetPL =
document.getElementById("reportNetPL");

const reportProfitFactor =
document.getElementById("reportProfitFactor");

const reportAverageWin =
document.getElementById("reportAverageWin");

const reportAverageLoss =
document.getElementById("reportAverageLoss");

const reportLargestWin =
document.getElementById("reportLargestWin");

const reportLargestLoss =
document.getElementById("reportLargestLoss");

/*=========================
MONTHLY REPORT
=========================*/

const reportMonth =
document.getElementById("reportMonth");

const monthTrades =
document.getElementById("monthTrades");

const monthWins =
document.getElementById("monthWins");

const monthLosses =
document.getElementById("monthLosses");

const monthWinRate =
document.getElementById("monthWinRate");

const monthProfit =
document.getElementById("monthProfit");

const monthLoss =
document.getElementById("monthLoss");

const monthNet =
document.getElementById("monthNet");

const bestDay =
document.getElementById("bestDay");

const worstDay =
document.getElementById("worstDay");

/*=========================
SETUP REPORT
=========================*/

const setupA1Wins =
document.getElementById("setupA1Wins");

const setupA1Losses =
document.getElementById("setupA1Losses");

const setupA1PL =
document.getElementById("setupA1PL");

const setupA1Rate =
document.getElementById("setupA1Rate");

const setupA2Wins =
document.getElementById("setupA2Wins");

const setupA2Losses =
document.getElementById("setupA2Losses");

const setupA2PL =
document.getElementById("setupA2PL");

const setupA2Rate =
document.getElementById("setupA2Rate");

const setupB1Wins =
document.getElementById("setupB1Wins");

const setupB1Losses =
document.getElementById("setupB1Losses");

const setupB1PL =
document.getElementById("setupB1PL");

const setupB1Rate =
document.getElementById("setupB1Rate");

const setupB2Wins =
document.getElementById("setupB2Wins");

const setupB2Losses =
document.getElementById("setupB2Losses");

const setupB2PL =
document.getElementById("setupB2PL");

const setupB2Rate =
document.getElementById("setupB2Rate");

/*=========================================================
TODAY
=========================================================*/

const today = new Date();

const yyyy = today.getFullYear();

const mm = String(today.getMonth()+1).padStart(2,"0");

const dd = String(today.getDate()).padStart(2,"0");

currentDate = `${yyyy}-${mm}-${dd}`;

journalDate.value = currentDate;

/*=========================================================
CREATE DATE
=========================================================*/

function createDay(date){

if(journal[date]) return;

journal[date]={

header:{

date:date,

session:"Asia",

marketBias:"Bullish",

selectedSetup:""

},

trades:[],

notes:{

todayPlan:"",

tradeReview:"",

mistakes:"",

lessons:"",

tomorrowPlan:""

},

psychology:{

fear:false,

greed:false,

fomo:false,

revenge:false,

overTrading:false,

patience:false,

followPlan:false,

noEmotion:false

},

screenshots:{

before:"",

after:"",

mistake:""

}

};

}

/*=========================================================
LOAD DAY
=========================================================*/

function loadDay(date){

createDay(date);

currentDate=date;

const day=journal[date];

session.value=day.header.session;

marketBias.value=day.header.marketBias;

loadTrades();

loadNotes();

loadPsychology();

loadScreenshots();

updateSummary();

refreshDashboard();

}

/*=========================================================
AUTO SAVE HEADER
=========================================================*/

session.addEventListener("change",()=>{

journal[currentDate].header.session=session.value;

saveDatabase();

});

marketBias.addEventListener("change",()=>{

journal[currentDate].header.marketBias=marketBias.value;

saveDatabase();

});

journalDate.addEventListener("change",()=>{

loadDay(journalDate.value);

});


/*=========================================================
ADD TRADE
=========================================================*/

addTrade.addEventListener("click", () => {

    createDay(currentDate);

    journal[currentDate].trades.push({

        id: Date.now(),
        time: "",
        pair: "",
        direction: "Buy",
        quantity: 1,
        entry: 0,
        exit: 0,
        pl: 0,
        emotion: "Confidence",
        mistake: "1 NONE",
        rule: "Yes"

    });

    loadTrades();

   saveDatabase();

    updateSummary();

    refreshDashboard();

});


/*=========================================================
START
=========================================================*/

/*========================================================
DISCIPLINE ADVANCED TRADER JOURNAL V2
script.js
Part 2
=========================================================*/

const setupCards = document.querySelectorAll(".setup-card");
const setupDetails = document.getElementById("setupDetails");
const detailTitle = document.getElementById("detailTitle");
const detailBadge = document.getElementById("detailBadge");
const setupRules = document.getElementById("setupRules");
const setupNote = document.getElementById("setupNote");
const resetSetup = document.getElementById("resetSetup");

const setupData = {
    "A1+": {
        badge: "Aggressive Entry",
        confidence: "100% Confident - BEST 85%",
        note: "[NOTE] Multiple levels pe jitne reasons hote he market utne time vaha se move karta he.",
        setups: [
            "TREND FEVER SWEENG 2 SE 85 RETRES + TRENDLINE + HEAD & SOLDER + FLIP CANDLE",
            "TREND FEVER SWEENG 2 SE 85 RETRES + 62 YA 50 MULTIPLE RETRES LEVEL SAM JAGAH PUR + FLIP CANDLE",
            "TREND FEVER SWEENG 2 SE 85 RETRES + FLIP CANDLE"
        ]
    },
    "A1": {
        badge: "Aggressive Entry",
        confidence: "90% Confident - BEST 62%",
        note: "[IMP NOT] (1) Same signal 85 level pe ho and level gap 50 point ke niche ho to 85 level pe entry karna he. (2) Multiple levels pe jitne reasons hote he market utne time vaha se move karta he.",
        setups: [
            "TREND FEVER SWEENG 2 SE 62 RETRES + TRENDLINE + HEAD & SOLDER + FLIP CANDLE",
            "TREND FEVER SWEENG 2 SE 62 RETRES + 62 YA 50 MULTIPLE RETRES LEVEL SAM JAGAH PUR + FLIP CANDLE",
            "TREND FEVER SWEENG 2 SE 62 RETRES pe aake market ne move kiya ho to us din market pura din Sweeng 2 se 62 level se move karega -> Next time 62 level pe aggressive entry le sakte he.",
            "BIG GAP DOWN YA GAP UP: Preves day close candle ya last sweeng se 62 + Multiple ya Head & Solder + Flip Candle",
            "SWEENG 2 RETRES 62 LEVEL ONLY 100 Point + ho."
        ]
    },
    "B1": {
        badge: "Conformation Entry",
        confidence: "90% Confident - MY GOOD B1+",
        note: "GAP UP / DOWN + WICK SETUP: High momentum condition setups.",
        setups: [
            "GAP DOWN SETUP: Big gap down + continue up + 62 retrest + flip + ya head & sloder + multiple + aggressive entry.",
            "GAP DOWN SETUP: Gap down + up aye multiple level tuch 62 + 85.",
            "GAP UP SETUP: Gap up opnig thay pachi down ave 60% ya 85% tuch thay, conformatione ape and up jay.",
            "GAP UP SETUP: Big gap up + 62 retrest + tredline ya multipole to aggressive entry.",
            "GAP UP SETUP: Gap up + down 62 ya 85 market tuch and up + BOS and jaha se up gaya tha vaha firse tuch hoke up ja sakta he.",
            "WICK SETUP: Market up ya down ja raha ho to candle preves candle ke apposit candle banaye to wick conforme hoti he.",
            "WICK SETUP: Wick se 85 ka level niklna he ya big move hoto 62 + multipole ya trendline + flip.",
            "WICK SETUP: Small candle ho to puri candle zone mark karna he and badi candle ho to sirf wick zone mark karna he.",
            "WICK SETUP: Most of the time ye setup continu up ya down me hi use kare.",
            "WICK SETUP: Near buy koi sweeng na ho to sweep se 85 and big move ho to 62 pe bhi tred le sakte he."
        ]
    },
    "B2+": {
        badge: "Confirmation / Core Setups",
        confidence: "80% Confident",
        note: "Reversal, Continue/Confuse and 15 Minute candle breakdown validation rules.",
        setups: [
            "REVERSAL SETUP: 1st point Indsment strong candl thi breck thay. 2nd point market indsment breck kari ne continue ye disa ma move kare. 3rd point Indsment breck karke uska supporte le and move kare.",
            "REVERSAL SETUP: Market kahi ek level pe ja ke time spend kare 50 to 60 minute and us zone me hidden revsal setup banye (Small Indsment breck, minor high banave, niche aya vager bijo minor high banave).",
            "REVERSAL SETUP: Tub ek sweeng indsment ho jayega and preves sweeng 1 and 2 ho jayega to S2 se 62 and 85 level mark karna he. 85 good entry, 62 pe extra conformatione ho to entry le sakte he.",
            "REVERSAL SETUP: Reversal setup me market ne jaha se apposit move kiya ho us candle tak stop loss rahkna chaye. Sweeng 2 market breck karde to bhi market revers ho jata he.",
            "CONTINUE / CONFUSE SETUP: BOS hona chahiye is setup me, indsment ki jarurt nahi hoti.",
            "CONTINUE / CONFUSE SETUP: Sweeng pe trendline draw karna he and trendline ke start point ko sweeng kah sakte he, ese 2 sweeng mark karo.",
            "CONTINUE / CONFUSE SETUP: 85 flip level ya fir bada zone hoto 62 + extra conformation jese trendline ya head & solder + FVG + flip.",
            "CONTINUE / CONFUSE SETUP: Continue market me trendline + 62 ya 85 vale zone me aggressive entry kare. Time 12 baje ke baad ya morning me small setup ke hisab se.",
            "15 MINUTE CANDLE BRECK SETUP: 15 minute breck candle strong moroboju honi chaye us breck level pe 62 ya 85 level hona chaye.",
            "15 MINUTE CANDLE BRECK SETUP: Near me koi good setup nahi hona chaye trend fever ho to us zone me entry kar sakte he.",
            "15 MINUTE CANDLE BRECK SETUP: 15Breck + 62 ya 85 + FVG ya trendline + flip candle entry zone."
        ]
    }
};

let activeCategoryView = "";

function showSetupCategory(categoryName) {
  const categoryInfo = setupData[categoryName];
  if (!categoryInfo) return;

  activeCategoryView = categoryName;

  // UI elements update
  detailTitle.innerHTML = `${categoryName} <span style="font-size: 16px; font-weight: 500; color: #b9b9b9; margin-left: 10px;">(${categoryInfo.confidence})</span>`;
  detailBadge.textContent = categoryInfo.badge;
  setupNote.textContent = categoryInfo.note;

  setupRules.innerHTML = "";
  
  const savedSelection = journal[currentDate].header.selectedSetup || "";
  let isAnyCheckboxChecked = savedSelection.startsWith(categoryName + " - Setup ");

  categoryInfo.setups.forEach((setupText, index) => {
    const uniqueSetupId = `${categoryName} - Setup ${index + 1}`;
    const isThisChecked = (savedSelection === uniqueSetupId);

    // Checkbox select -> baaki hide logic
    if (isAnyCheckboxChecked && !isThisChecked) {
      return; 
    }

    const li = document.createElement("li");
    
    // CSS layout ke sath dynamic adjustment
    li.style.display = "flex";
    li.style.alignItems = "center"; 
    li.style.gap = "15px";
    li.style.marginBottom = "15px";
    li.style.cursor = "pointer";

    // CSS counter ring ko use karne ke liye innerHTML clean kiya
    li.innerHTML = `
      <input type="checkbox" class="setup-custom-chk" data-id="${uniqueSetupId}" ${isThisChecked ? 'checked' : ''} style="transform: scale(1.4); width: 20px; height: 20px; cursor: pointer; accent-color: #19d76b; flex-shrink: 0;">
      <div class="setup-text-box" style="flex: 1; line-height: 1.6; font-size: 20px; color: #f1f5f9;">
        ${setupText}
      </div>
    `;

    const checkboxElement = li.querySelector(".setup-custom-chk");
    const textElement = li.querySelector(".setup-text-box");

    const triggerCheckboxToggle = () => {
      if (checkboxElement.checked) {
        journal[currentDate].header.selectedSetup = uniqueSetupId;
      } else {
        journal[currentDate].header.selectedSetup = "";
      }
      saveDatabase();
      showSetupCategory(categoryName); 
    };

    checkboxElement.addEventListener("change", triggerCheckboxToggle);
    textElement.addEventListener("click", () => {
      checkboxElement.checked = !checkboxElement.checked;
      triggerCheckboxToggle();
    });

    setupRules.appendChild(li);
  });

  setupDetails.classList.add("show");

  // Category cards sync
  setupCards.forEach(card => {
    card.classList.remove("active");
    card.classList.remove("hide");
    if (card.dataset.setup === categoryName) {
      card.classList.add("active");
    } else {
      card.classList.add("hide");
    }
  });
}

/*=========================================================
SETUP CARDS CLICK EVENTS
=========================================================*/
setupCards.forEach(card => {
  card.addEventListener("click", () => {
    showSetupCategory(card.dataset.setup);
  });
});

/*=========================================================
RESET ACTION (SAB WAPAS)
=========================================================*/
resetSetup.addEventListener("click", () => {
  journal[currentDate].header.selectedSetup = "";
  saveDatabase();
  
  setupDetails.classList.remove("show");
  activeCategoryView = "";
  
  setupCards.forEach(card => {
    card.classList.remove("active");
    card.classList.remove("hide");
  });
});

/*=========================================================
LOAD SETUP (AUTOMATIC FROM LOCALSTORAGE)
=========================================================*/
function loadSetup() {
  const selected = journal[currentDate].header.selectedSetup || "";
  setupDetails.classList.remove("show");
  
  setupCards.forEach(card => {
    card.classList.remove("active");
    card.classList.remove("hide");
  });

  if (selected) {
    const rootCategory = selected.split(" - ")[0];
    if (setupData[rootCategory]) {
      showSetupCategory(rootCategory);
    }
  } else if (activeCategoryView) {
    showSetupCategory(activeCategoryView);
  }
}

/*=========================================================
LOAD TRADES & OPERATIONS
=========================================================*/
function loadTrades() {
    tradeBody.innerHTML = "";
    const trades = journal[currentDate].trades;

    trades.forEach((trade, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><input class="time" value="${trade.time}"></td>
            <td><input class="pair" value="${trade.pair}"></td>
            <td>
                <select class="direction">
                    <option ${trade.direction === "Buy" ? "selected" : ""}>Buy</option>
                    <option ${trade.direction === "Sell" ? "selected" : ""}>Sell</option>
                </select>
            </td>
            <td><input class="quantity" type="number" step="0.01" value="${trade.quantity}"></td>
            <td><input class="entry" type="number" step="0.01" value="${trade.entry}"></td>
            <td><input class="exit" type="number" step="0.01" value="${trade.exit}"></td>
            <td><input class="pl" readonly value="${trade.pl}"></td>
            <td>
                <select class="emotion">
                    <option ${trade.emotion === "Confidence" ? "selected" : ""}>Confidence</option>
                    <option ${trade.emotion === "Normal" ? "selected" : ""}>Normal</option>
                    <option ${trade.emotion === "Fear" ? "selected" : ""}>Fear</option>
                    <option ${trade.emotion === "Greed" ? "selected" : ""}>Greed</option>
                    <option ${trade.emotion === "FOMO" ? "selected" : ""}>FOMO</option>
                    <option ${trade.emotion === "Revenge" ? "selected" : ""}>Revenge</option>
                </select>
            </td>
            <td>
                <select class="mistake-select">
                    <option ${trade.mistake === "NONE" || trade.mistake === "1 NONE" ? "selected" : ""}>1 NONE</option>
                    <option ${trade.mistake === "2 FOMO ENTRY" ? "selected" : ""}>2 FOMO ENTRY</option>
                    <option ${trade.mistake === "3 FEAR EXIT" ? "selected" : ""}>3 FEAR EXIT</option>
                    <option ${trade.mistake === "4 OVER TRADING" ? "selected" : ""}>4 OVER TRADING</option>
                    <option ${trade.mistake === "5 STOPLOSS MOVE" ? "selected" : ""}>5 STOPLOSS MOVE</option>
                    <option ${trade.mistake === "6 STUCK IN LOSS" ? "selected" : ""}>6 STUCK IN LOSS</option>
                    <option ${trade.mistake === "7 NOT FOLLOW SETUP" ? "selected" : ""}>7 NOT FOLLOW SETUP</option>
                    <option ${trade.mistake === "8 OPPOSITE TREND" ? "selected" : ""}>8 OPPOSITE TREND</option>
                    <option ${trade.mistake === "9 MISS GOOD TRADE" ? "selected" : ""}>9 MISS GOOD TRADE</option>
                    <option ${trade.mistake === "10 REVENGE TRADE" ? "selected" : ""}>10 REVENGE TRADE</option>
                    <option ${trade.mistake === "11 HOPE YA GUESS" ? "selected" : ""}>11 HOPE YA GUESS</option>
                </select>
            </td>
            <td>
                <select class="rule">
                    <option ${trade.rule === "Yes" ? "selected" : ""}>Yes</option>
                    <option ${trade.rule === "Partial" ? "selected" : ""}>Partial</option>
                    <option ${trade.rule === "No" ? "selected" : ""}>No</option>
                </select>
            </td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        tradeBody.appendChild(row);
        attachTradeEvents(row, index);
    });
    loadSetup();
}

/*=========================================================
ATTACH TRADE EVENTS
=========================================================*/
function attachTradeEvents(row, index) {
    row.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            updateTrade(row, index);
        });
    });

   const deleteBtn = row.querySelector(".delete-btn");

if (deleteBtn) {

    deleteBtn.addEventListener("click", () => {

        journal[currentDate].trades.splice(index, 1);

        loadTrades();

       saveDatabase();
        
        updateSummary();

        refreshDashboard();

    });

}

}

/*=========================================================
UPDATE TRADE & CURRENT ROW STATUS
=========================================================*/
function updateTrade(row, index) {
    const trades = journal[currentDate].trades;
    const trade = trades[index];

    trade.time = row.querySelector(".time").value;
    trade.pair = row.querySelector(".pair").value;
    trade.direction = row.querySelector(".direction").value;
    trade.quantity = parseFloat(row.querySelector(".quantity").value) || 0;
    trade.entry = parseFloat(row.querySelector(".entry").value) || 0;
    trade.exit = parseFloat(row.querySelector(".exit").value) || 0;
    trade.emotion = row.querySelector(".emotion").value;
    trade.mistake = row.querySelector(".mistake-select").value; 
    trade.rule = row.querySelector(".rule").value;

    calculateTrade(trade);
    
    row.querySelector(".pl").value = trade.pl;

    if (Number(trade.pl) > 0) {
        row.querySelector(".pl").className = "pl profit";
    } else if (Number(trade.pl) < 0) {
        row.querySelector(".pl").className = "pl loss";
    } else {
        row.querySelector(".pl").className = "pl";
    }
    
   saveDatabase();

updateSummary();

refreshDashboard();

}

/*=========================================================
CALCULATE TRADE
=========================================================*/
function calculateTrade(trade) {
    let points = 0;
    if (trade.direction === "Buy") {
        points = trade.exit - trade.entry;
    } else {
        points = trade.entry - trade.exit;
    }
    trade.pl = (points * trade.quantity).toFixed(2);
}

/*=========================================================
SAVE DATABASE
=========================================================*/

async function saveDatabase(){

    try{

       await fetch("/api/trades",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(journal)

        });

    }
    catch(err){

        console.error("Database Save Error:",err);

    }

    updateSummary();

    buildCalendar();

    refreshDashboard();

}

/*=========================================================
SUMMARY
=========================================================*/

function updateSummary(){

const trades=

journal[currentDate].trades;

let total=trades.length;

let wins=0;

let losses=0;

let net=0;

let best=0;

let worst=0;

let rr=0;

trades.forEach(trade=>{

const pl=Number(trade.pl)||0;

net+=pl;

rr+=Number(trade.reward)||0;

if(pl>0){

wins++;

}

if(pl<0){

losses++;

}

if(pl>best){

best=pl;

}

if(pl<worst){

worst=pl;

}

});

const averageRR=

total

?

(rr/total).toFixed(2)

:

"0.00";

const rate=

total

?

((wins/total)*100).toFixed(2)+"%"

:

"0%";

/*=========================================================
UPDATE DASHBOARD
=========================================================*/

document.getElementById("totalTrades").value=total;

document.getElementById("winningTrades").value=wins;

document.getElementById("losingTrades").value=losses;

document.getElementById("winRate").value=rate;

document.getElementById("netProfit").value=

net.toFixed(2);

document.getElementById("bestTrade").value=

best.toFixed(2);

document.getElementById("worstTrade").value=

worst.toFixed(2);

document.getElementById("averageRR").value=

averageRR;

}/*=========================================================
DISCIPLINE ADVANCED TRADER JOURNAL V2
script.js
Part 4
CALENDAR SYSTEM
=========================================================*/

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

buildCalendar();/*=========================================================
DISCIPLINE ADVANCED TRADER JOURNAL V2
script.js
Part 5 (FINAL)
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

/*=========================================================
SCREENSHOTS
=========================================================*/

function imageUpload(inputId,key,imageId){

const input=document.getElementById(inputId);

const img=document.getElementById(imageId);

const zone=input.closest(".drop-zone");

const removeBtn=zone.querySelector(".remove-image");

/* ---------- SAVE IMAGE ---------- */

function saveImage(file){

    if(!file) return;

    const reader=new FileReader();

    reader.onload=e=>{

        journal[currentDate].screenshots[key]=e.target.result;

        img.src=e.target.result;

        img.style.display="block";

        img.style.pointerEvents="auto";

        saveDatabase();

    };

    reader.readAsDataURL(file);

}

/* ---------- CHOOSE FILE ---------- */

input.addEventListener("change",()=>{

    if(input.files.length){

        saveImage(input.files[0]);

    }

});

/* ---------- CLICK EMPTY BOX ---------- */

zone.addEventListener("click",(e)=>{

    if(
        e.target===img ||
        e.target===removeBtn
    ){
        return;
    }

    input.click();

});

/* ---------- IMAGE FULL SCREEN ---------- */

img.addEventListener("click",(e)=>{

    e.preventDefault();

    e.stopPropagation();

    const image=journal[currentDate].screenshots[key];

    if(!image) return;

    const win=window.open();

    win.document.write(`
    <html>
    <head>
    <title>Chart</title>
    <style>
    body{
    margin:0;
    background:#000;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    }
    img{
    max-width:100%;
    max-height:100%;
    object-fit:contain;
    }
    </style>
    </head>
    <body>
    <img src="${image}">
    </body>
    </html>
    `);

});

/* ---------- DRAG ---------- */

zone.addEventListener("dragover",(e)=>{

    e.preventDefault();

    zone.classList.add("drag-over");

});

zone.addEventListener("dragleave",()=>{

    zone.classList.remove("drag-over");

});

zone.addEventListener("drop",(e)=>{

    e.preventDefault();

    zone.classList.remove("drag-over");

    const file=e.dataTransfer.files[0];

    if(file && file.type.startsWith("image/")){

        saveImage(file);

    }

});

/* ---------- CTRL + V ---------- */

zone.setAttribute("tabindex","0");

zone.addEventListener("paste",(e)=>{

    const items=e.clipboardData.items;

    for(const item of items){

        if(item.type.startsWith("image/")){

            saveImage(item.getAsFile());

            e.preventDefault();

            return;

        }

    }

});

/* ---------- DELETE ---------- */

removeBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    journal[currentDate].screenshots[key]="";

    img.src="";

    img.style.display="none";

    img.style.pointerEvents="none";

    input.value="";

    saveDatabase();

});

} // imageUpload End

/* ---------- LOAD SCREENSHOTS ---------- */

function loadScreenshots(){

const map=[
["before","beforePreview"],
["after","afterPreview"],
["mistake","mistakePreview"]
];

map.forEach(([key,id])=>{

    const img=document.getElementById(id);

    const data=journal[currentDate].screenshots[key];

    if(data){

        img.src=data;
        img.style.display="block";
        img.style.pointerEvents="auto";

    }else{

        img.src="";
        img.style.display="none";
        img.style.pointerEvents="none";

    }

});

}

/* ---------- INIT ---------- */

imageUpload("beforeChart","before","beforePreview");
imageUpload("afterChart","after","afterPreview");
imageUpload("mistakeChart","mistake","mistakePreview");



/*=========================================================
SAVE BUTTON
=========================================================*/

saveTrade.addEventListener("click",()=>{

saveDatabase();

alert("Trade Saved Successfully.");

});

/*=========================================================
SEARCH
=========================================================*/

document.getElementById("searchTrade")

.addEventListener("input",e=>{

const search=e.target.value.toLowerCase();

document.querySelectorAll("#tradeBody tr")

.forEach(row=>{

const pair=row.querySelector(".pair").value.toLowerCase();

row.style.display=

pair.includes(search)

?""

:"none";

});

});

/*=========================================================
CLEAR
=========================================================*/

document.getElementById("clearJournal")

.addEventListener("click",()=>{

if(!confirm("Delete Today's Journal ?")) return;

delete journal[currentDate];

saveDatabase();

loadDay(currentDate);

buildCalendar();

});

/*=========================================================
BACKUP
=========================================================*/

document.getElementById("backupData")

.addEventListener("click",()=>{

const blob=new Blob(

[JSON.stringify(journal)],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="TradingJournalBackup.json";

a.click();

});

/*=========================================================
RESTORE
=========================================================*/

document.getElementById("restoreData")

.addEventListener("click",()=>{

document.getElementById("restoreFile").click();

});

document.getElementById("restoreFile")

.addEventListener("change",e=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=x=>{

journal=JSON.parse(x.target.result);

saveDatabase();

loadDay(currentDate);

buildCalendar();

alert("Backup Restored");

};

reader.readAsText(file);

});

/*=========================================================
PRINT
=========================================================*/

document.getElementById("printJournal")

.addEventListener("click",()=>{

window.print();

});

/*=========================================================
EXCEL
=========================================================*/

document.getElementById("exportExcel")

.addEventListener("click",()=>{

const sheet=

XLSX.utils.json_to_sheet(

journal[currentDate].trades

);

const wb=

XLSX.utils.book_new();

XLSX.utils.book_append_sheet(

wb,

sheet,

"Trades"

);

XLSX.writeFile(

wb,

"TradingJournal.xlsx"

);

});

/*=========================================================
PDF
=========================================================*/

document.getElementById("exportPDF")

.addEventListener("click",()=>{

const {jsPDF}=window.jspdf;

const pdf=new jsPDF();

pdf.setFontSize(18);

pdf.text(

"DISCIPLINE ADVANCED TRADER",

20,

20

);

pdf.setFontSize(11);

pdf.text(

"Date : "+currentDate,

20,

35

);

let y=50;

journal[currentDate].trades

.forEach((trade,index)=>{

pdf.text(

`${index+1}. ${trade.pair} | ${trade.direction} | Qty:${trade.quantity} | P/L:${trade.pl}`,

20,

y

);

y+=8;

if(y>280){

pdf.addPage();

y=20;

}

});

pdf.save("TradingJournal.pdf");

});

/*=========================================================
DASHBOARD REPORTS
PART-3
ACCORDION
=========================================================*/

function toggleDashboard(id){

    const panel =
    document.getElementById(id);

    if(!panel) return;

    const box =
    panel.closest(".analytics-box");

    const opened =
    panel.classList.contains("show");

    document
    .querySelectorAll(".analytics-panel")
    .forEach(p=>{

        p.classList.remove("show");

    });

    document
    .querySelectorAll(".analytics-box")
    .forEach(b=>{

        b.classList.remove("active");

    });

    if(!opened){

        panel.classList.add("show");

        if(box){

            box.classList.add("active");

        }

    }

}

/*=========================================================
AUTO BIND
=========================================================*/

document
.querySelectorAll("[data-dashboard]")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        toggleDashboard(

            btn.dataset.dashboard

        );

    });

});

/*=========================================================
DASHBOARD REPORTS
PART-4
CALCULATE REPORTS
=========================================================*/

function calculateDashboardReports(){

    dashboard.totalTrades = 0;
    dashboard.winningTrades = 0;
    dashboard.losingTrades = 0;

    dashboard.totalProfit = 0;
    dashboard.totalLoss = 0;

    dashboard.largestWin = 0;
    dashboard.largestLoss = 0;

    for(const date in journal){

        if(!journal[date]) continue;

        if(!journal[date].trades) continue;

        journal[date].trades.forEach(trade=>{

            dashboard.totalTrades++;

            const pl = Number(trade.pl)||0;

            if(pl>0){

                dashboard.winningTrades++;

                dashboard.totalProfit += pl;

                if(pl>dashboard.largestWin){

                    dashboard.largestWin = pl;

                }

            }

            else if(pl<0){

                dashboard.losingTrades++;

                dashboard.totalLoss += Math.abs(pl);

                if(Math.abs(pl)>dashboard.largestLoss){

                    dashboard.largestLoss = Math.abs(pl);

                }

            }

        });

    }

    dashboard.netPL =
    dashboard.totalProfit-dashboard.totalLoss;

    dashboard.winRate =
    dashboard.totalTrades===0
    ?0:
    (
    dashboard.winningTrades/
    dashboard.totalTrades
    )*100;

    dashboard.averageWin =
    dashboard.winningTrades===0
    ?0:
    dashboard.totalProfit/
    dashboard.winningTrades;

    dashboard.averageLoss =
    dashboard.losingTrades===0
    ?0:
    dashboard.totalLoss/
    dashboard.losingTrades;

    dashboard.profitFactor =
    dashboard.totalLoss===0
    ?dashboard.totalProfit
    :
    dashboard.totalProfit/
    dashboard.totalLoss;

}

/*=========================================================
DASHBOARD REPORTS
PART-5
UPDATE REPORT UI
=========================================================*/

function updateDashboardUI(){

    if(reportTotalTrades)
        reportTotalTrades.textContent =
        dashboard.totalTrades;

    if(reportWinningTrades)
        reportWinningTrades.textContent =
        dashboard.winningTrades;

    if(reportLosingTrades)
        reportLosingTrades.textContent =
        dashboard.losingTrades;

    if(reportWinRate)
        reportWinRate.textContent =
        dashboard.winRate.toFixed(1)+"%";

    if(reportTotalProfit)
        reportTotalProfit.textContent =
        dashboard.totalProfit.toFixed(2);

    if(reportTotalLoss)
        reportTotalLoss.textContent =
        dashboard.totalLoss.toFixed(2);

    if(reportNetPL)
        reportNetPL.textContent =
        dashboard.netPL.toFixed(2);

    if(reportProfitFactor){

        reportProfitFactor.textContent =

        dashboard.profitFactor===Infinity

        ? "∞"

        : dashboard.profitFactor.toFixed(2);

    }

    if(reportAverageWin)
        reportAverageWin.textContent =
        dashboard.averageWin.toFixed(2);

    if(reportAverageLoss)
        reportAverageLoss.textContent =
        dashboard.averageLoss.toFixed(2);

    if(reportLargestWin)
        reportLargestWin.textContent =
        dashboard.largestWin.toFixed(2);

    if(reportLargestLoss)
        reportLargestLoss.textContent =
        dashboard.largestLoss.toFixed(2);

}

/*=========================================================
DASHBOARD REPORTS
PART-6
MASTER UPDATE FUNCTION
=========================================================*/

function updateDashboard(){

    calculateDashboardReports();

    updateDashboardUI();

    if(typeof calculateMonthlyReport==="function"){

        calculateMonthlyReport();

    }

    if(typeof updateMonthlyReportUI==="function"){

        updateMonthlyReportUI();

    }

/* =========================
WEEKLY REPORT
========================= */

if(typeof calculateWeeklyReport==="function"){

    calculateWeeklyReport();

}

if(typeof updateWeeklyReportUI==="function"){

    updateWeeklyReportUI();

}


    if(typeof calculateTradingScore==="function"){

        calculateTradingScore();

    }

    if(typeof updateTradingScoreUI==="function"){

        updateTradingScoreUI();

    }

    if(typeof calculateSetupAnalytics==="function"){

        calculateSetupAnalytics();

    }

    if(typeof updateSetupAnalyticsUI==="function"){

        updateSetupAnalyticsUI();

    }

    if(typeof updateDashboardCharts==="function"){

        updateDashboardCharts();

    }

}

/*=========================================================
WEEKLY REPORT OBJECT
=========================================================*/

const weeklyReport = {

    trades: 0,
    wins: 0,
    losses: 0,

    totalProfit: 0,
    totalLoss: 0,

    netPL: 0,
    winRate: 0,

    bestTrade: 0,
    worstTrade: 0

};

/*=========================================================
WEEKLY REPORT CALCULATION
=========================================================*/

function calculateWeeklyReport(){

    weeklyReport.trades = 0;
    weeklyReport.wins = 0;
    weeklyReport.losses = 0;

    weeklyReport.totalProfit = 0;
    weeklyReport.totalLoss = 0;

    weeklyReport.netPL = 0;
    weeklyReport.winRate = 0;

    weeklyReport.bestTrade = Number.NEGATIVE_INFINITY;
    weeklyReport.worstTrade = Number.POSITIVE_INFINITY;

    const weekDays = {

    Monday:    { pl: 0, trades: 0 },
    Tuesday:   { pl: 0, trades: 0 },
    Wednesday: { pl: 0, trades: 0 },
    Thursday:  { pl: 0, trades: 0 },
    Friday:    { pl: 0, trades: 0 }

};

    const today = new Date();

    const firstDay = new Date(today);

    firstDay.setDate(today.getDate() - today.getDay());

    firstDay.setHours(0,0,0,0);

    const lastDay = new Date(firstDay);

    lastDay.setDate(firstDay.getDate()+6);

    lastDay.setHours(23,59,59,999);

    const options = {

        day:"2-digit",
        month:"short"

    };

    document.getElementById("weekRange").textContent =
        `${firstDay.toLocaleDateString("en-IN",options)}
 - ${lastDay.toLocaleDateString("en-IN",options)}`;

    for(const date in journal){

        if(!journal[date]) continue;

        const d = new Date(date);

        if(isNaN(d)) continue;

        if(d < firstDay || d > lastDay) continue;

        if(!journal[date].trades) continue;

        journal[date].trades.forEach(trade=>{

            const pl = Number(trade.pl)||0;
           
           const dayName = d.toLocaleDateString("en-IN", {
    weekday: "long"
});

if (weekDays[dayName]) {

    weekDays[dayName].pl += pl;

    weekDays[dayName].trades++;

}
    
            weeklyReport.trades++;

            if(pl>0){

                weeklyReport.wins++;

                weeklyReport.totalProfit += pl;

            }

            else if(pl<0){

                weeklyReport.losses++;

                weeklyReport.totalLoss += Math.abs(pl);

            }

            if(pl>weeklyReport.bestTrade)
                weeklyReport.bestTrade = pl;

            if(pl<weeklyReport.worstTrade)
                weeklyReport.worstTrade = pl;

        });

    }

    weeklyReport.netPL =
        weeklyReport.totalProfit -
        weeklyReport.totalLoss;

    weeklyReport.winRate =
        weeklyReport.trades===0
        ?0
        :(weeklyReport.wins/weeklyReport.trades)*100;

    if(weeklyReport.bestTrade===Number.NEGATIVE_INFINITY)
        weeklyReport.bestTrade=0;

    if(weeklyReport.worstTrade===Number.POSITIVE_INFINITY)
        weeklyReport.worstTrade=0;

     updateWeekDayUI("Monday", weekDays.Monday);
updateWeekDayUI("Tuesday", weekDays.Tuesday);
updateWeekDayUI("Wednesday", weekDays.Wednesday);
updateWeekDayUI("Thursday", weekDays.Thursday);
updateWeekDayUI("Friday", weekDays.Friday);

}

/*=========================================================
UPDATE WEEKLY UI
=========================================================*/

function updateWeeklyReportUI(){

    weekTrades.textContent = weeklyReport.trades;

    weekWins.textContent = weeklyReport.wins;

    weekLosses.textContent = weeklyReport.losses;

    weekWinRate.textContent =
        weeklyReport.winRate.toFixed(1)+"%";

    weekProfit.textContent =
        "₹"+weeklyReport.totalProfit.toFixed(2);

    weekLoss.textContent =
        "₹"+weeklyReport.totalLoss.toFixed(2);

    weekNet.textContent =
        "₹"+weeklyReport.netPL.toFixed(2);

    weekBest.textContent =
        "₹"+weeklyReport.bestTrade.toFixed(2);

    weekWorst.textContent =
        "₹"+weeklyReport.worstTrade.toFixed(2);

}

function updateWeekDayUI(day, data){

    const plElement =
        document.getElementById(day.toLowerCase()+"PL");

    const tradeElement =
        document.getElementById(day.toLowerCase()+"Trades");

    if(!plElement || !tradeElement) return;

    tradeElement.textContent =
        data.trades + (data.trades === 1 ? " Trade" : " Trades");

    if(data.trades===0){

        plElement.textContent="No Trade";

        plElement.className="day-neutral";

        return;

    }

    if (data.pl > 0) {

    plElement.textContent = "+₹" + data.pl.toFixed(2);
    plElement.className = "day-profit";

}
else if (data.pl < 0) {

    plElement.textContent = "-₹" + Math.abs(data.pl).toFixed(2);
    plElement.className = "day-loss";

}
else {

    plElement.textContent = "Break Even";
    plElement.className = "day-neutral";

}

}

/*=========================================================
AUTO REFRESH
=========================================================*/

function refreshDashboard(){

    updateDashboard();

}

/*=========================================================
DASHBOARD REPORTS
PART-7
MONTHLY REPORT CALCULATION
=========================================================*/

function calculateMonthlyReport(){

    if(!reportMonth) return;

    monthlyReport.trades = 0;
    monthlyReport.wins = 0;
    monthlyReport.losses = 0;

    monthlyReport.totalProfit = 0;
    monthlyReport.totalLoss = 0;

    monthlyReport.netPL = 0;
    monthlyReport.winRate = 0;

    monthlyReport.bestDay = "--";
    monthlyReport.worstDay = "--";

    const month =
    Number(reportMonth.value);

    let bestPL = -Infinity;
    let worstPL = Infinity;

    for(const date in journal){

        if(!journal[date]) continue;

        const d = new Date(date);

        if(isNaN(d)) continue;

        if(d.getMonth()!=month) continue;

        let dayPL = 0;

        if(!journal[date].trades) continue;

        journal[date].trades.forEach(trade=>{

            const pl = Number(trade.pl)||0;

            monthlyReport.trades++;

            dayPL += pl;

            if(pl>0){

                monthlyReport.wins++;

                monthlyReport.totalProfit += pl;

            }

            else if(pl<0){

                monthlyReport.losses++;

                monthlyReport.totalLoss +=
                Math.abs(pl);

            }

        });

        if(dayPL>bestPL){

            bestPL = dayPL;

            monthlyReport.bestDay = date;

        }

        if(dayPL<worstPL){

            worstPL = dayPL;

            monthlyReport.worstDay = date;

        }

    }

    monthlyReport.netPL =
    monthlyReport.totalProfit -
    monthlyReport.totalLoss;

    monthlyReport.winRate =

    monthlyReport.trades===0

    ?0

    :

    (

    monthlyReport.wins/

    monthlyReport.trades

    )*100;

}

/*=========================================================
UPDATE MONTHLY UI
=========================================================*/

function updateMonthlyReportUI(){

    if(monthTrades)
        monthTrades.textContent =
        monthlyReport.trades;

    if(monthWins)
        monthWins.textContent =
        monthlyReport.wins;

    if(monthLosses)
        monthLosses.textContent =
        monthlyReport.losses;

    if(monthWinRate)
        monthWinRate.textContent =
        monthlyReport.winRate.toFixed(1)+"%";

    if(monthProfit)
        monthProfit.textContent =
        monthlyReport.totalProfit.toFixed(2);

    if(monthLoss)
        monthLoss.textContent =
        monthlyReport.totalLoss.toFixed(2);

    if(monthNet)
        monthNet.textContent =
        monthlyReport.netPL.toFixed(2);

    if(bestDay)
        bestDay.textContent =
        monthlyReport.bestDay;

    if(worstDay)
        worstDay.textContent =
        monthlyReport.worstDay;

}

/*=========================================================
MONTH CHANGE
=========================================================*/

if(reportMonth){

    reportMonth.addEventListener(

        "change",

        updateDashboard

    );

}

/*=========================================================
DASHBOARD REPORTS
PART-8
TRADING SCORE
=========================================================*/

function calculateTradingScore(){

    dashboard.score = 0;

    /*=========================
    WIN RATE
    =========================*/

    dashboard.score +=

    Math.min(

        dashboard.winRate,

        40

    );

    /*=========================
    PROFIT FACTOR
    =========================*/

    dashboard.score +=

    Math.min(

        dashboard.profitFactor*10,

        30

    );

    /*=========================
    CONSISTENCY
    =========================*/

    dashboard.score +=

    Math.min(

        dashboard.totalTrades,

        30

    );

    dashboard.score =

    Math.round(

        dashboard.score

    );

}

/*=========================================================
UPDATE SCORE UI
=========================================================*/

function updateTradingScoreUI(){

    const scoreValue =

    document.getElementById(

        "tradingScore"

    );

    const scoreLevel =

    document.getElementById(

        "scoreLevel"

    );

    const scoreStars =

    document.getElementById(

        "scoreStars"

    );

    if(scoreValue){

        scoreValue.textContent =

        dashboard.score;

    }

    if(!scoreLevel) return;

    if(dashboard.score>=90){

        scoreLevel.textContent =

        "MASTER";

        scoreLevel.className =

        "score-master";

        if(scoreStars)

        scoreStars.textContent =

        "★★★★★";

    }

    else if(dashboard.score>=75){

        scoreLevel.textContent =

        "ADVANCED";

        scoreLevel.className =

        "score-advanced";

        if(scoreStars)

        scoreStars.textContent =

        "★★★★☆";

    }

    else if(dashboard.score>=55){

        scoreLevel.textContent =

        "INTERMEDIATE";

        scoreLevel.className =

        "score-intermediate";

        if(scoreStars)

        scoreStars.textContent =

        "★★★☆☆";

    }

    else{

        scoreLevel.textContent =

        "BEGINNER";

        scoreLevel.className =

        "score-beginner";

        if(scoreStars)

        scoreStars.textContent =

        "★★☆☆☆";

    }

}

/*=========================================================
DASHBOARD REPORTS
PART-9
SETUP ANALYTICS
=========================================================*/

function calculateSetupAnalytics(){

    /*=========================
    RESET
    =========================*/

    ["A1","A2","B1","B2"].forEach(setup=>{

        setupReport[setup].trades = 0;
        setupReport[setup].wins = 0;
        setupReport[setup].losses = 0;
        setupReport[setup].pl = 0;

    });

    /*=========================
    LOOP JOURNAL
    =========================*/

    for(const date in journal){

        if(!journal[date]) continue;

        if(!journal[date].trades) continue;

        journal[date].trades.forEach(trade=>{

            const setup =

            (trade.setup || "").trim();

            if(

                !setupReport.hasOwnProperty(setup)

            ) return;

            const pl = Number(trade.pl)||0;

            setupReport[setup].trades++;

            setupReport[setup].pl += pl;

            if(pl>0){

                setupReport[setup].wins++;

            }

            else if(pl<0){

                setupReport[setup].losses++;

            }

        });

    }

}

/*=========================================================
UPDATE SETUP UI
=========================================================*/

function updateSetupAnalyticsUI(){

    updateOneSetup(

        "A1",

        setupA1Wins,

        setupA1Losses,

        setupA1PL,

        setupA1Rate

    );

    updateOneSetup(

        "A2",

        setupA2Wins,

        setupA2Losses,

        setupA2PL,

        setupA2Rate

    );

    updateOneSetup(

        "B1",

        setupB1Wins,

        setupB1Losses,

        setupB1PL,

        setupB1Rate

    );

    updateOneSetup(

        "B2",

        setupB2Wins,

        setupB2Losses,

        setupB2PL,

        setupB2Rate

    );

}

/*=========================================================
HELPER
=========================================================*/

function updateOneSetup(

setup,

winsEl,

lossEl,

plEl,

rateEl

){

    const data =

    setupReport[setup];

    const rate =

    data.trades===0

    ?0

    :

    (

        data.wins/

        data.trades

    )*100;

    if(winsEl)

        winsEl.textContent =

        data.wins;

    if(lossEl)

        lossEl.textContent =

        data.losses;

    if(plEl)

        plEl.textContent =

        data.pl.toFixed(2);

    if(rateEl)

        rateEl.textContent =

        rate.toFixed(1)+"%";

}


/*=========================================================
DASHBOARD REPORTS
PART-10A
CHART HELPERS + EQUITY CURVE
=========================================================*/

function destroyDashboardCharts(){

    if(equityChart){

        equityChart.destroy();
        equityChart = null;

    }

    if(monthlyChart){

        monthlyChart.destroy();
        monthlyChart = null;

    }

    if(winLossChart){

        winLossChart.destroy();
        winLossChart = null;

    }

    if(setupChart){

        setupChart.destroy();
        setupChart = null;

    }

}

/*=========================================================
COLORS
=========================================================*/

const dashboardChartColors={

    green:"#19d76b",

    red:"#ff4b5c",

    blue:"#3d8bfd",

    gold:"#d4af37",

    white:"#ffffff",

    grid:"rgba(255,255,255,.08)"

};

/*=========================================================
EQUITY DATA
=========================================================*/

function getEquityData(){

    const labels=[];

    const values=[];

    let balance=0;

    const dates=

    Object.keys(journal).sort();

    dates.forEach(date=>{

        if(!journal[date]) return;

        if(!journal[date].trades) return;

        let dayPL=0;

        journal[date].trades.forEach(trade=>{

            dayPL+=Number(trade.pl)||0;

        });

        balance+=dayPL;

        labels.push(date);

        values.push(balance);

    });

    return{

        labels,

        values

    };

}

/*=========================================================
EQUITY CHART
=========================================================*/

function drawEquityChart(){

    const canvas=

    document.getElementById(

        "equityChart"

    );

    if(!canvas) return;

    const data=

    getEquityData();

    if(equityChart){

        equityChart.destroy();

    }

    equityChart=

    new Chart(

        canvas,

        {

            type:"line",

            data:{

                labels:data.labels,

                datasets:[{

                    label:"Equity",

                    data:data.values,

                    borderColor:

                    dashboardChartColors.green,

                    backgroundColor:

                    "rgba(25,215,107,.15)",

                    borderWidth:3,

                    tension:.35,

                    fill:true,

                    pointRadius:4,

                    pointHoverRadius:6

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        labels:{

                            color:"#fff"

                        }

                    }

                },

                scales:{

                    x:{

                        ticks:{

                            color:"#fff"

                        },

                        grid:{

                            color:

                            dashboardChartColors.grid

                        }

                    },

                    y:{

                        ticks:{

                            color:"#fff"

                        },

                        grid:{

                            color:

                            dashboardChartColors.grid

                        }

                    }

                }

            }

        }

    );

}

/*=========================================================
DASHBOARD REPORTS
PART-10B
MONTHLY BAR + WIN LOSS PIE
=========================================================*/

function getMonthlyPLData(){

    const months=[
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const values=new Array(12).fill(0);

    Object.keys(journal).forEach(date=>{

        if(!journal[date]) return;
        if(!journal[date].trades) return;

        const d=new Date(date);

        if(isNaN(d)) return;

        let total=0;

        journal[date].trades.forEach(trade=>{

            total+=Number(trade.pl)||0;

        });

        values[d.getMonth()]+=total;

    });

    return{

        labels:months,

        values:values

    };

}

/*=========================================================
MONTHLY BAR CHART
=========================================================*/

function drawMonthlyChart(){

    const canvas=
    document.getElementById("monthlyChart");

    if(!canvas) return;

    const data=
    getMonthlyPLData();

    if(monthlyChart){

        monthlyChart.destroy();

    }

    monthlyChart=new Chart(canvas,{

        type:"bar",

        data:{

            labels:data.labels,

            datasets:[{

                label:"Monthly P/L",

                data:data.values,

                backgroundColor:
                dashboardChartColors.gold,

                borderRadius:8

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    labels:{

                        color:"#fff"

                    }

                }

            },

            scales:{

                x:{

                    ticks:{

                        color:"#fff"

                    },

                    grid:{

                        color:
                        dashboardChartColors.grid

                    }

                },

                y:{

                    ticks:{

                        color:"#fff"

                    },

                    grid:{

                        color:
                        dashboardChartColors.grid

                    }

                }

            }

        }

    });

}

/*=========================================================
WIN LOSS PIE
=========================================================*/

function drawWinLossChart(){

    const canvas=
    document.getElementById("winLossChart");

    if(!canvas) return;

    if(winLossChart){

        winLossChart.destroy();

    }

    winLossChart=new Chart(canvas,{

        type:"pie",

        data:{

            labels:[

                "Winning Trades",

                "Losing Trades"

            ],

            datasets:[{

                data:[

                    dashboard.winningTrades,

                    dashboard.losingTrades

                ],

                backgroundColor:[

                    dashboardChartColors.green,

                    dashboardChartColors.red

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{

                        color:"#fff"

                    }

                }

            }

        }

    });

}

/*=========================================================
DASHBOARD REPORTS
PART-10C
SETUP CHART + UPDATE ALL CHARTS
=========================================================*/

function drawSetupChart(){

    const canvas =
    document.getElementById("setupChart");

    if(!canvas) return;

    if(setupChart){

        setupChart.destroy();

    }

    setupChart = new Chart(canvas,{

        type:"bar",

        data:{

            labels:[
                "A1",
                "A2",
                "B1",
                "B2"
            ],

            datasets:[{

                label:"Setup P/L",

                data:[

                    setupReport.A1.pl,

                    setupReport.A2.pl,

                    setupReport.B1.pl,

                    setupReport.B2.pl

                ],

                backgroundColor:[

                    "#22c55e",

                    "#3b82f6",

                    "#f59e0b",

                    "#ef4444"

                ],

                borderRadius:10

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    labels:{

                        color:"#ffffff"

                    }

                }

            },

            scales:{

                x:{

                    ticks:{

                        color:"#ffffff"

                    },

                    grid:{

                        color:"rgba(255,255,255,.08)"

                    }

                },

                y:{

                    ticks:{

                        color:"#ffffff"

                    },

                    grid:{

                        color:"rgba(255,255,255,.08)"

                    }

                }

            }

        }

    });

}

/*=========================================================
UPDATE ALL CHARTS
=========================================================*/

function updateDashboardCharts(){

    destroyDashboardCharts();

    drawEquityChart();

    drawMonthlyChart();

    drawWinLossChart();

    drawSetupChart();

}

/*=========================================================
FINAL LOAD
=========================================================*/

(async function(){

    await loadDatabase();

    createDay(currentDate);

    loadDay(currentDate);

    buildCalendar();

    refreshDashboard();

    console.log(
        "DISCIPLINE ADVANCED TRADER JOURNAL V2 READY"
    );

})();

/*=========================================================
END OF FILE
=========================================================*/

document.querySelectorAll(".setup-card").forEach(card => {
    card.addEventListener("click", () => {
        const setupName = card.getAttribute("data-setup");
        console.log("Click hua:", setupName);
        
        // Data dikhane ka logic
        const details = document.getElementById("setupDetails");
        details.style.display = "block";
        
        // Yahan aap apna function call karein
        showSetupCategory(setupName); 
    });
});

document.getElementById("resetSetup").addEventListener("click", () => {
    document.getElementById("setupDetails").style.display = "none";
});
