/*=========================================================
FILE : filters.js
MODULE : Trade Search & Filter
VERSION : V3.1
=========================================================*/


/*=========================================================
PART 19A
SEARCH & CLEAR BUTTON
V3.0
=========================================================*/

// Search Button
document.getElementById("searchTradeBtn")
.addEventListener("click", () => {

    // Existing realtime search ko trigger karega
    document.getElementById("searchTrade")
    .dispatchEvent(new Event("input"));

});

// Clear Button
document.getElementById("clearTradeBtn")
.addEventListener("click", () => {

   console.log("Clear Button Clicked"); 

    document.getElementById("searchTrade").value = "";

    document.getElementById("filterDirection").value = "All";

    document.getElementById("filterResult").value = "All";

    document.getElementById("filterSetup").value = "All";

    // Realtime search ko dobara trigger karo
    document.getElementById("searchTrade")
    .dispatchEvent(new Event("input"));

});

/*=========================================================
END PART 19A
=========================================================*/

/*=========================================================
PART 19B
TRADE FILTER ENGINE
V3.0
=========================================================*/

function applyTradeFilters(){

    const search=document.getElementById("searchTrade").value.toLowerCase().trim();

    const direction=document.getElementById("filterDirection").value;

    const result=document.getElementById("filterResult").value;

    const setup=document.getElementById("filterSetup").value;

    let filtered=journal[currentDate].trades.filter(trade=>{

        const pairMatch=
            trade.pair.toLowerCase().includes(search);

        const directionMatch=
            direction==="All" || trade.direction===direction;

        const resultMatch=
            result==="All" ||
            (result==="Profit" && Number(trade.pl)>0) ||
            (result==="Loss" && Number(trade.pl)<0);

        const setupMatch=
            setup==="All" ||
            trade.setup===setup;

        return pairMatch &&
               directionMatch &&
               resultMatch &&
               setupMatch;

    });

    loadTrades(filtered);

}

/* Search */

document.getElementById("searchTrade")
.addEventListener("input",applyTradeFilters);

/* Direction */

document.getElementById("filterDirection")
.addEventListener("change",applyTradeFilters);

/* Result */

document.getElementById("filterResult")
.addEventListener("change",applyTradeFilters);

/* Setup */

document.getElementById("filterSetup")
.addEventListener("change",applyTradeFilters);


/*=========================================================
END PART 19B
=========================================================*/