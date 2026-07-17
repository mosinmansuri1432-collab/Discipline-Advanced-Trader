

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

    "A1+": {
        trades:0,
        wins:0,
        losses:0,
        pl:0
    },

    "A1": {
        trades:0,
        wins:0,
        losses:0,
        pl:0
    },

    "B1+": {
        trades:0,
        wins:0,
        losses:0,
        pl:0
    },

    "B2+": {
        trades:0,
        wins:0,
        losses:0,
        pl:0
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
        emotion: "Confidence",
        mistake: "1 NONE",
        rule: "Yes",
        setup: (journal[currentDate].header.selectedSetup || "").split(" - ")[0],
         pl: 0,

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

const setupCards = document.querySelectorAll(".setup-cards > .setup-card");
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
    "B1+": { 
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
   
    console.log("Setup Open :", categoryName);
    
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
DISCIPLINE CENTER
PART-1
=========================================================*/

const disciplineCards =
document.querySelectorAll(".discipline-card");

const disciplineDetails =
document.getElementById("disciplineDetails");

const disciplineTitle =
document.getElementById("disciplineTitle");

const disciplineBadge =
document.getElementById("disciplineBadge");

const disciplineContent =
document.getElementById("disciplineContent");

const disciplineNote =
document.getElementById("disciplineNote");

const resetDiscipline =
document.getElementById("resetDiscipline");

const disciplineData = {

    rules:{

        badge:"TODAY'S RULES",

        title:"📋 Today's Rules",

        note:"Follow every rule before taking any trade.",

        items:[

            "Maximum 2 Trades OR ₹3000 Daily Loss",

            "Risk : Reward = 1 : 3",

            "No Revenge Trade",

            "Trade Only A1+ & A1",

            "30 Minute Gap After Losing Trade",

            "No Mobile / TV / Sleep During Market Hours",

            "Complete Journal Before End Of Day"

        ]

    },

   score:{

    badge:"DISCIPLINE SCORE",

    title:"⭐ Discipline Score",

    note:"Complete these 5 discipline rules before or after trading.",

    rules:[

        {
            id:"setup",

            title:"1️⃣ Setup Rule (सेटअप का नियम) — 20%",

            question:
            "क्या मैंने अपने ट्रेडिंग सेटअप या स्ट्रेटेजी के बनने का इंतजार किया?",

            yes:
            "जब आपकी स्ट्रेटेजी ने Buy या Sell का सिग्नल दिया, आपने तभी ट्रेड लिया।",

            no:
            "आपने बिना किसी ठोस वजह के, सिर्फ मार्केट को ऊपर-नीचे भागते देख (FOMO में) ट्रेड ले लिया।"
        },


        {
            id:"risk",

            title:"2️⃣ Risk Management Rule (रिस्क मैनेजमेंट) — 20%",

            question:
            "क्या मैंने अपनी तय की हुई क्वांटिटी (Position Sizing) के साथ ही ट्रेड किया?",

            yes:
            "आपने पहले से तय किया था कि इस ट्रेड में कितना रिस्क लेना है और उतनी ही क्वांटिटी ट्रेड की।",

            no:
            "लालच में आकर बहुत बड़ी क्वांटिटी ले ली जिससे बड़ा नुकसान हो सकता था।"
        },


        {
            id:"stoploss",

            title:"3️⃣ Stop-Loss Rule (स्टॉप-लॉस का नियम) — 20%",

            question:
            "क्या मैंने ट्रेड लेते ही सिस्टम में स्टॉप-लॉस लगाया और उसे बदला नहीं?",

            yes:
            "ट्रेड लेते ही SL लगाया और मार्केट विपरीत गया तो अपना लॉस स्वीकार किया।",

            no:
            "बिना SL ट्रेड किया या लॉस होने पर स्टॉप-लॉस को नीचे खिसकाया।"
        },


        {
            id:"execution",

            title:"4️⃣ Execution & Exit Rule (एग्जिट का नियम) — 20%",

            question:
            "क्या मैं अपने टारगेट या स्टॉप-लॉस आने तक ट्रेड में टिका रहा?",

            yes:
            "मार्केट को अपना काम करने दिया। या Target मिला या Stop-Loss।",

            no:
            "डर की वजह से जल्दी exit किया या बिना वजह trade बंद किया।"
        },


        {
            id:"emotion",

            title:"5️⃣ Emotion & Over-trading Rule (इमोशन कंट्रोल) — 20%",

            question:
            "क्या मैंने आज अपना डेली लिमिट पार नहीं किया?",

            yes:
            "लिमिट पूरी होने के बाद स्क्रीन बंद कर दी और revenge trade नहीं किया।",

            no:
            "लॉस रिकवर करने के चक्कर में Revenge Trading की और ज्यादा trades लिए।"
        }

    ]

},



    daily:{

        badge:"DAILY TARGET",

        title:"🎯 Daily Target",

        note:"Track today's trading goal.",

        items:[

            "Daily Profit Target",

            "Current Profit",

            "Progress",

            "Remaining Target"

        ]

    },

    weekly:{

        badge:"WEEKLY TARGET",

        title:"📅 Weekly Target",

        note:"Track your weekly goal.",

        items:[

            "Weekly Goal",

            "Current Result",

            "Progress",

            "Remaining"

        ]

    },

    monthly:{

        badge:"MONTHLY TARGET",

        title:"📈 Monthly Target",

        note:"Track your monthly goal.",

        items:[

            "Monthly Goal",

            "Current Result",

            "Progress",

            "Remaining"

        ]

    },

    consistency:{

        badge:"CONSISTENCY",

        title:"🔥 Consistency Score",

        note:"Maintain consistent discipline every trading day.",

        items:[

            "Current Streak",

            "Last 30 Days",

            "Average Discipline",

            "Performance Level"

        ]

    }

};

let activeDisciplineView = "";

/*=========================================================
DISCIPLINE CENTER
PART-2
SHOW CATEGORY
=========================================================*/

function showDisciplineCategory(categoryName){

    const categoryInfo = disciplineData[categoryName];

    if(!categoryInfo) return;

    activeDisciplineView = categoryName;

    disciplineTitle.textContent = categoryInfo.title;
    disciplineBadge.textContent = categoryInfo.badge;

    disciplineContent.innerHTML = "";

    const scoreBox =
    document.getElementById("disciplineScoreResult");

    scoreBox.style.display = "none";

    if(categoryName==="score"){

        disciplineNote.textContent="";

        categoryInfo.rules.forEach((rule)=>{

            const li=document.createElement("li");

            li.style.listStyle="none";
            li.style.marginBottom="25px";

            li.innerHTML=`

                <div style="font-size:20px;color:#f8fafc;margin-bottom:10px;">
                    <b>${rule.title}</b>
                </div>

                <div style="font-size:16px;color:#cbd5e1;margin-bottom:10px;">
                    ${rule.question}
                </div>

                <label style="display:block;margin-bottom:10px;cursor:pointer;">

                    <input
                    type="checkbox"
                    class="discipline-score-check"
                    data-rule="${rule.id}"
                    data-value="yes"
                    ${getSavedDisciplineValue(rule.id)==="yes" ? "checked" : ""}
                    style="
                    width:20px;
                    height:20px;
                    accent-color:#19d76b;
                    cursor:pointer;
                    ">

                    ✅ YES (+20%)

                    <div style="margin-left:28px;color:#94a3b8;">
                        ${rule.yes}
                    </div>

                </label>

                <label style="display:block;cursor:pointer;">

                    <input
                    type="checkbox"
                    class="discipline-score-check"
                    data-rule="${rule.id}"
                    data-value="no"
                    ${getSavedDisciplineValue(rule.id)==="no" ? "checked" : ""}
                    style="
                    width:20px;
                    height:20px;
                    accent-color:#ef4444;
                    cursor:pointer;
                    ">

                    ❌ NO (0%)

                    <div style="margin-left:28px;color:#94a3b8;">
                        ${rule.no}
                    </div>

                </label>

            `;

            disciplineContent.appendChild(li);

            const checks=
            li.querySelectorAll(".discipline-score-check");

            checks.forEach(check=>{

                check.addEventListener("change",()=>{

                    if(check.checked){

                        checks.forEach(other=>{

                            if(other!==check){

                                other.checked=false;

                            }

                        });

                    }

                    updateDisciplineScoreDisplay();

                    saveDisciplineChecks();

                    saveDisciplineScore();

                });

            });

        });

        disciplineDetails.classList.add("show");

        disciplineCards.forEach(card=>{

            card.classList.remove("active","hide");

            if(card.dataset.card==="score"){

                card.classList.add("active");

            }
            else{

                card.classList.add("hide");

            }

        });

        scoreBox.style.display="block";

        updateDisciplineScoreDisplay();

        return;

    }
      
      if(

    categoryName==="daily" ||

    categoryName==="weekly" ||

    categoryName==="monthly"

){

    renderTargetModule(categoryName);

    disciplineDetails.classList.add("show");

    disciplineCards.forEach(card=>{

        card.classList.remove("active","hide");

        if(card.dataset.card===categoryName){

            card.classList.add("active");

        }

        else{

            card.classList.add("hide");

        }

    });

    return;

}

        disciplineNote.textContent =
    categoryInfo.note;

    categoryInfo.items.forEach((item,index)=>{

        const li =
        document.createElement("li");

        li.style.display="flex";
        li.style.alignItems="center";
        li.style.gap="15px";
        li.style.marginBottom="15px";
        li.style.listStyle="none";

        li.innerHTML=`

            <input
                type="checkbox"
                class="discipline-checkbox"
                id="discipline-${index}"
                style="
                width:20px;
                height:20px;
                cursor:pointer;
                accent-color:#19d76b;
                ">

            <span
                style="
                font-size:18px;
                color:#f8fafc;
                line-height:1.6;
                ">

                ${item}

            </span>

        `;

        disciplineContent.appendChild(li);

    });

    disciplineDetails.classList.add("show");

    disciplineCards.forEach(card=>{

        card.classList.remove("active","hide");

        if(card.dataset.card===categoryName){

            card.classList.add("active");

        }
        else{

            card.classList.add("hide");

        }

    });

}

/*=========================================================
TARGET MODULE
RENDER
=========================================================*/

function renderTargetModule(type){

    const titles={

        daily:"🎯 Daily",

        weekly:"📅 Weekly",

        monthly:"📈 Monthly"

    };

    disciplineNote.textContent="";

    const savedTarget =
    journal[currentDate]?.targets?.[type] || {

        target:0,

        done:false

    };

    disciplineContent.innerHTML=`

        <li
        style="
        list-style:none;
        ">

            <div class="target-module">

                <h3>

                    ${titles[type]} Profit Target

                </h3>

                <input
                type="number"
                id="${type}TargetInput"
                class="target-input"
                data-type="${type}"
                value="${savedTarget.target}"
                placeholder="Enter Target">

                <hr>

                <p>

                    <strong>

                        Current Profit

                    </strong>

                </p>

                <h3
                id="${type}CurrentProfit">

                    ₹0

                </h3>

                <hr>

                <p>

                    <strong>

                        Remaining Target

                    </strong>

                </p>

                <h3
                id="${type}RemainingTarget">

                    ₹0

                </h3>

                <hr>

                <label
                style="
                display:flex;
                align-items:center;
                gap:12px;
                font-size:18px;
                font-weight:600;
                cursor:pointer;
                margin-top:10px;
                ">

                    <input
                    type="checkbox"
                    id="${type}TargetDone"
                    class="target-done"
                    data-type="${type}"
                    ${savedTarget.done ? "checked" : ""}
                    style="
                    width:22px;
                    height:22px;
                    accent-color:#19d76b;
                    cursor:pointer;
                    flex-shrink:0;
                    ">

                    <span>

                        Target Done

                    </span>

                </label>

            </div>

        </li>

    `;

    updateTargetModule(type);

    document
    .getElementById(`${type}TargetInput`)
    .addEventListener("input",()=>{

        updateTargetModule(type);

        saveTargets();

    });

    document
    .getElementById(`${type}TargetDone`)
    .addEventListener("change",()=>{

        saveTargets();

    });

}


/*=========================================================
DISCIPLINE CENTER
PART-3
CLICK EVENTS + RESET + LOAD
=========================================================*/

disciplineCards.forEach(card=>{

    card.addEventListener("click",()=>{

    
      showDisciplineCategory(

            card.dataset.card

        );

    });

});

/*=========================================================
RESET DISCIPLINE
=========================================================*/

resetDiscipline.addEventListener("click",()=>{

    disciplineDetails.classList.remove("show");

    activeDisciplineView="";

    disciplineCards.forEach(card=>{

        card.classList.remove("active");

        card.classList.remove("hide");

    });

});

/*=========================================================
LOAD DISCIPLINE
=========================================================*/

function loadDiscipline(){

    disciplineDetails.classList.remove("show");

    disciplineCards.forEach(card=>{

        card.classList.remove("active");

        card.classList.remove("hide");

    });

    if(activeDisciplineView){

        showDisciplineCategory(

            activeDisciplineView

        );

    }

}

/*=========================================================
DISCIPLINE SCORE
PART-3A
CALCULATE SCORE
=========================================================*/

function calculateDisciplineScore(){


    const checks =
    document.querySelectorAll(".discipline-score-check");


    let score = 0;

    let completed = 0;

    let pending = 0;


    checks.forEach(check=>{


        if(check.checked && check.dataset.value==="yes"){


            score += 20;

            completed++;


        }


        else if(check.checked && check.dataset.value==="no"){


            completed++;


        }


    });



    const totalRules = 5;


    pending =
    totalRules - completed;



    return {

        score:score,

        completed:completed,

        pending:pending

    };


}

/*=========================================================
DISCIPLINE SCORE
PART-3B
LIVE SCORE UPDATE
=========================================================*/

function updateDisciplineScoreDisplay(){


    const result =
    calculateDisciplineScore();


    const scoreBox =
    document.getElementById("disciplineScoreResult");


    if(!scoreBox) return;

if(activeDisciplineView !== "score"){

    scoreBox.style.display = "none";

    return;

}

scoreBox.style.display = "block";

    let rating = "";


    if(result.score >= 80){

        rating = "🔥 Excellent Discipline";

    }

    else if(result.score >= 60){

        rating = "👍 Good Discipline";

    }

    else if(result.score >= 40){

        rating = "⚠️ Improve Discipline";

    }

    else{

        rating = "❌ Need More Control";

    }



    scoreBox.innerHTML = `

        <div style="
        margin-top:25px;
        padding:20px;
        background:#111827;
        border:2px solid #d4af37;
        border-radius:15px;
        ">

        <h3>⭐ Today's Score</h3>

        <p>
        Score:
        <b>${result.score}%</b>
        </p>


        <p>
        Completed Rules:
        <b>${result.completed}/5</b>
        </p>


        <p>
        Pending Rules:
        <b>${result.pending}</b>
        </p>


        <p>
        Discipline Rating:
        <b>${rating}</b>
        </p>


        </div>

    `;


}



/*=========================================================
CHECKBOX CHANGE EVENT
=========================================================*/

document.addEventListener("change",(e)=>{


    if(e.target.classList.contains("discipline-score-check")){

        saveDisciplineChecks();

        updateDisciplineScoreDisplay();

        saveDisciplineScore();


    }
   
    if(

    e.target.classList.contains("target-input") ||

    e.target.classList.contains("target-done")

){

    saveTargets();

}

});

/*=========================================================
TARGET MODULE
CURRENT PROFIT
=========================================================*/

function getTargetCurrentProfit(type){

    let total = 0;

    if(type==="daily"){

        const trades =
        journal[currentDate]?.trades || [];

        trades.forEach(trade=>{

            total += Number(trade.pl || 0);

        });

    }

    else if(type==="weekly"){

        Object.keys(journal).forEach(date=>{

            const d = new Date(date);

            const today = new Date(currentDate);

            const start = new Date(today);

            start.setDate(today.getDate()-today.getDay());

            const end = new Date(start);

            end.setDate(start.getDate()+6);

            if(d>=start && d<=end){

                (journal[date].trades || []).forEach(trade=>{

                    total += Number(trade.pl || 0);

                });

            }

        });

    }

    else if(type==="monthly"){

        Object.keys(journal).forEach(date=>{

            const d = new Date(date);

            const today = new Date(currentDate);

            if(

                d.getMonth()===today.getMonth() &&

                d.getFullYear()===today.getFullYear()

            ){

                (journal[date].trades || []).forEach(trade=>{

                    total += Number(trade.pl || 0);

                });

            }

        });

    }

    return total;

}

 /*=========================================================
TARGET MODULE
UPDATE
=========================================================*/

function updateTargetModule(type){

    const targetInput =
    document.getElementById(`${type}TargetInput`);

    const currentProfit =
    document.getElementById(`${type}CurrentProfit`);

    const remainingTarget =
    document.getElementById(`${type}RemainingTarget`);

    if(

        !targetInput ||

        !currentProfit ||

        !remainingTarget

    ) return;

    const target =
    Number(targetInput.value)||0;

    const current =
    getTargetCurrentProfit(type);

    const remaining =
    target-current;

    currentProfit.textContent =
    `₹${current}`;

    remainingTarget.textContent =
    `₹${remaining}`;

}

/*=========================================================
DISCIPLINE SCORE
PART-4B
SAVE DATA
=========================================================*/

function saveDisciplineScore(){


    const result =
    calculateDisciplineScore();



    let rating = "";


    if(result.score >= 80){

        rating = "Excellent Discipline";

    }

    else if(result.score >= 60){

        rating = "Good Discipline";

    }

    else if(result.score >= 40){

        rating = "Improve Discipline";

    }

    else{

        rating = "Need More Control";

    }



    // Make sure today's journal exists

    if(!journal[currentDate]){

        journal[currentDate] = {};

    }


    if(!journal[currentDate].discipline){

        journal[currentDate].discipline = {};

    }



    journal[currentDate].discipline = {

        score: result.score,

        completed: result.completed,

        pending: result.pending,

        rating: rating

    };



    saveDatabase();



}

/*=========================================================
LOAD SAVED DISCIPLINE CHECK
=========================================================*/

function getSavedDisciplineValue(ruleId){


    const saved =
    journal[currentDate]?.disciplineChecks;


    if(!saved) return "";


    return saved[ruleId] || "";


}

/*=========================================================
DISCIPLINE SCORE
PART-4D
SAVE CHECKBOX SELECTION
=========================================================*/

function saveDisciplineChecks(){


    if(!journal[currentDate]){

        journal[currentDate]={};

    }


    if(!journal[currentDate].disciplineChecks){

        journal[currentDate].disciplineChecks={};

    }


    const checks =
    document.querySelectorAll(".discipline-score-check");


    checks.forEach(check=>{


        if(check.checked){


            journal[currentDate].disciplineChecks[check.dataset.rule]
            =
            check.dataset.value;


        }


    });


    saveDatabase();


}

/*=========================================================
TARGET MODULE
SAVE TARGETS
=========================================================*/

function saveTargets(){

    if(!journal[currentDate]){

        journal[currentDate]={};

    }

    if(!journal[currentDate].targets){

        journal[currentDate].targets={};

    }

    document.querySelectorAll(".target-input").forEach(input=>{

        const type=input.dataset.type;

        const done=document.querySelector(
            `#${type}TargetDone`
        );

        journal[currentDate].targets[type]={

            target:Number(input.value)||0,

            done:done ? done.checked : false

        };

    });

    saveDatabase();

}

/*=========================================================

END DISCIPLINE CENTER
=========================================================*/

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

}



;/*=========================================================
DISCIPLINE ADVANCED TRADER JOURNAL V2
script.js
Part 5 (FINAL)
=========================================================*/






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

  console.log("1. Click:", id);

    const panel =
    document.getElementById(id);

    console.log("2. Before:", panel.className);

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

          console.log("3. After:", panel.className);

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
JOURNAL MODULES
=========================================================*/

document.querySelectorAll(".journal-module").forEach(card=>{

    card.addEventListener("click",()=>{

        const target = document.getElementById(card.dataset.module);

        if(!target) return;

        card.classList.toggle("active");

        target.classList.toggle("show");

    });

});