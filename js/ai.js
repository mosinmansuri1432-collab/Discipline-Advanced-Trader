/*=========================================================
TRADEROS AI ENGINE V3
=========================================================*/


console.log("🤖 AI ENGINE LOADED");


/*=========================================================
AI TODAY DATA
=========================================================*/

function getTodayTrades(){

    if(!journal[currentDate]) return [];

    return journal[currentDate].trades;

}

/*=========================================================
AI HEALTH METER
=========================================================*/

function updateAIHealthMeter(){
    
   const discipline = 85;

   const status = "Excellent Trading Discipline";

 document.getElementById("aiHealthScore").textContent =
`${discipline} / 100`;

document.getElementById("aiHealthStatus").textContent =
status;

}

updateAIHealthMeter();

/*=========================================================
AI GRADE
=========================================================*/

function getTodayGrade(){

    const trades = getTodayTrades();

    if(trades.length === 0){

        return "--";

    }

    const allRulesFollowed =
trades.every(trade => trade.rule === "Yes");

const hasMajorMistake =
trades.some(trade =>
trade.mistake !== "1 NONE"
);

if(allRulesFollowed && !hasMajorMistake){

    return "A";

}

if(allRulesFollowed && hasMajorMistake){

    return "B";

}

return "C";

}


/*=========================================================
AI STRENGTH
=========================================================*/

function getTodayStrength(){

    const trades = getTodayTrades();

    if(trades.length === 0){

        return "--";

    }

    const allRulesFollowed =
    trades.every(trade => trade.rule === "Yes");

    const noMistake =
    trades.every(trade => trade.mistake === "1 NONE");

    if(allRulesFollowed && noMistake){

        return "Excellent Discipline";

    }

    if(allRulesFollowed){

        return "Good Rule Following";

    }

    return "Needs More Discipline";

}

/*=========================================================
AI WEAKNESS
=========================================================*/

function getTodayWeakness(){

    const trades = getTodayTrades();

    if(trades.length === 0){

        return "--";

    }

    const mistake = trades[0].mistake;

    switch(mistake){

        case "2 FOMO ENTRY":
            return "FOMO Entry";

        case "3 FEAR EXIT":
            return "Fear Exit";

        case "4 OVER TRADING":
            return "Over Trading";

        case "5 STOPLOSS MOVE":
            return "Stoploss Movement";

        case "6 STUCK IN LOSS":
            return "Holding Losing Trades";

        case "7 NOT FOLLOW SETUP":
            return "Setup Discipline";

        case "8 OPPOSITE TREND":
            return "Against Trend Trading";

        case "9 MISS GOOD TRADE":
            return "Missed Opportunity";

        case "10 REVENGE TRADE":
            return "Revenge Trading";

        case "11 HOPE YA GUESS":
            return "Hope Based Trading";

        default:
            return "No Major Weakness";

    }

}


/*=========================================================
AI MISSION
=========================================================*/

function getTodayMission(){

    const trades = getTodayTrades();

    if(trades.length === 0){

        return "Wait for an A+ Setup Today";

    }

    const hasMistake = trades.some(trade =>
        trade.mistake !== "1 NONE"
    );

    const allRulesFollowed = trades.every(trade =>
        trade.rule === "Yes"
    );

    if(!allRulesFollowed){

        return "Focus on Following Every Trading Rule";

    }

    if(hasMistake){

        return "Avoid Repeating Today's Mistakes";

    }

    return "Maintain Your Current Discipline";

}

/*=========================================================
AI EMOTION
=========================================================*/

function getTodayEmotion(){

    const trades = getTodayTrades();

    if(trades.length === 0){

        return "--";

    }

    return trades[0].emotion;

}

/*=========================================================
AI EMOTION OBSERVATION
=========================================================*/

function getEmotionObservation(){

    const emotion = getTodayEmotion();

    switch(emotion){

        case "Confidence":
            return "Excellent execution with confidence.";

        case "Normal":
            return "Emotions remained under control.";

        case "Fear":
            return "Fear affected your execution & caused you to stay stuck in losing trades.";

        case "Greed":
            return "Don't exit at only 1:3 R:R. Follow your plan and move targets only when your strategy allows.";

        case "FOMO":
            return "Avoid chasing the market. Wait patiently for your A+ setup.";

        case "Revenge":
            return "Avoid revenge trading. Take a break after a losing trade.";

        default:
            return "--";

    }

}

/*=========================================================
AI ADVICE
=========================================================*/

function getEmotionAdvice(){

    const emotion = getTodayEmotion();

    switch(emotion){

        case "Confidence":
            return "Keep following your trading plan with discipline.";

        case "Normal":
            return "Stay consistent and wait for quality setups.";

        case "Fear":
            return "Trust your setup and execute without hesitation.";

        case "Greed":
            return "Book profits according to your trading plan. Don't let greed control exits.";

        case "FOMO":
            return "Wait patiently. The market always gives another opportunity.";

        case "Revenge":
            return "Take a break after a losing trade before entering again.";

        default:
            return "--";

    }

}

/*=========================================================
AI DAILY COACH DATA
=========================================================*/

function updateAIDailyCoach(){

   const grade = getTodayGrade();

    const strength = getTodayStrength(); 

    const weakness = getTodayWeakness();

   const mission = getTodayMission(); 

    document.getElementById("aiGrade").textContent = grade;

    document.getElementById("aiStrength").textContent = strength;

    document.getElementById("aiWeakness").textContent = weakness;

    document.getElementById("aiMission").textContent = mission;
    
    document.getElementById("aiEmotion").textContent = getTodayEmotion();
   
    document.getElementById("aiObservation").textContent =
    getEmotionObservation();

    document.getElementById("aiAdvice").textContent =
    getEmotionAdvice();

}

/*=========================================================
AI DAILY COACH
=========================================================*/

const aiDailyCoachCard = document.getElementById("aiDailyCoachCard");

const aiDailyCoachDetails = document.getElementById("aiDailyCoachDetails");

const aiArrow = document.getElementById("aiArrow");

aiDailyCoachCard.addEventListener("click", () => {

if(aiDailyCoachDetails.style.display === "none"){
   
    updateAIDailyCoach();
    
    aiArrow.style.transform = "rotate(180deg)";

    aiDailyCoachDetails.style.display = "block";

}else{
     
    aiArrow.style.transform = "rotate(0deg)";

    aiDailyCoachDetails.style.display = "none";

}      

});  

/*=========================================================
AI SETUP PERFORMANCE
=========================================================*/

const aiSetupCard = document.getElementById("aiSetupCard");
const aiSetupDetails = document.getElementById("aiSetupDetails");
const aiSetupArrow = document.getElementById("aiSetupArrow");

aiSetupCard.addEventListener("click",()=>{

    if(aiSetupDetails.style.display==="block"){

        aiSetupDetails.style.display="none";
        aiSetupArrow.style.transform="rotate(0deg)";

    }else{

        aiSetupDetails.style.display="block";
        aiSetupArrow.style.transform="rotate(180deg)";

        updateSetupPerformance();

    }

});

/*=========================================================
UPDATE SETUP PERFORMANCE
=========================================================*/

function updateSetupPerformance(){

    loadSetupCard("A1+","a1plus");
    loadSetupCard("A1","a1");
    loadSetupCard("B1+","b1");
    loadSetupCard("B2+","b2");

}

/*=========================================================
LOAD SINGLE SETUP
=========================================================*/

function loadSetupCard(setupName,id){

    const trades = journal[currentDate].trades || [];

    const setupTrades = trades.filter(t=>t.setup===setupName);

    document.getElementById(id+"Trades").textContent =
    setupTrades.length;

    document.getElementById(id+"Win").textContent="--";

    document.getElementById(id+"PL").textContent="--";

    document.getElementById(id+"AI").textContent=
    "AI Analysis Coming Soon...";

}
