/*=========================================================
FILE : reports.js
MODULE : Reports System
VERSION : V3.1
=========================================================*/


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
