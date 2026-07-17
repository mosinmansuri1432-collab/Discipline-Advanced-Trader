/*=========================================================
FILE : trades.js
MODULE : Trade Management
VERSION : V3.1
=========================================================*/

/*=========================================================
LOAD TRADES & OPERATIONS
=========================================================*/

function loadTrades(trades = journal[currentDate].trades) {
    tradeBody.innerHTML = "";

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

             <td>
    <select class="setup">
        <option ${trade.setup === "A1+" ? "selected" : ""}>A1+</option>
        <option ${trade.setup === "A1" ? "selected" : ""}>A1</option>
        <option ${trade.setup === "B1+" ? "selected" : ""}>B1+</option>
        <option ${trade.setup === "B2+" ? "selected" : ""}>B2+</option>
    </select>
</td>

<td><input class="pl" readonly value="${trade.pl}"></td> 

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

row.querySelectorAll("select").forEach(select => {

    select.addEventListener("change", () => {

        updateTrade(row, index);

    });

});

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
    trade.setup = row.querySelector(".setup").value;

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

// LIVE TARGET UPDATE
updateTargetModule("daily");
updateTargetModule("weekly");
updateTargetModule("monthly");

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