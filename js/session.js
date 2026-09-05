

/*=========================================================
PREMIUM MODULE
=========================================================*/

function togglePremiumModule(

    moduleId,

    lockId,

    hasAccess

){

    document.getElementById(moduleId).style.display =
        hasAccess ? "block" : "none";

    document.getElementById(lockId).style.display =
        hasAccess ? "none" : "block";

}

/*=========================================================
SESSION CHECK
=========================================================*/

console.log("Session.js Loaded");

async function checkSession() {

    const { data, error } = await client.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

   if (!data.session) {

    window.location.href = "login.html";
    return;

}

console.log("User Logged In");
console.log(data.session.user);

const user = data.session.user;
window.currentUserId = user.id;

/*=========================================================
  MY PROFILE DETAILS
=========================================================*/

const myProfileName = document.getElementById("myProfileName");
const myProfileEmail = document.getElementById("myProfileEmail");
const myProfileUserId = document.getElementById("myProfileUserId");
const myProfilePlan = document.getElementById("myProfilePlan");

const profileFullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email.split("@")[0];

if (myProfileName) {
    myProfileName.textContent = profileFullName;
}

if (myProfileEmail) {
    myProfileEmail.textContent = user.email;
}

if (myProfileUserId) {
    myProfileUserId.textContent = user.id;
}


/*=========================================================
LOAD USER PROFILE
=========================================================*/

const response = await fetch(

    "/api/profile?user_id=" + user.id

);

const profile = await response.json();



window.currentUserProfile = profile;

/*=========================================================*
*ADMIN PANEL ACCESS*
*=========================================================*/

const adminPanelBtn = document.getElementById("adminPanelBtn");

if (adminPanelBtn) {

    if (profile.role === "admin") {

        adminPanelBtn.style.display = "block";

        adminPanelBtn.addEventListener("click", () => {
            window.location.href = "admin.html";
        });

    } else {

        adminPanelBtn.style.display = "none";

    }

}

const fullName =
    user.user_metadata.full_name ||
    user.user_metadata.name ||
    user.email.split("@")[0];

const firstName = fullName.split(" ")[0];

const userNameEl = document.getElementById("userName");
const profileNameEl = document.getElementById("profileName");
const profileEmailEl = document.getElementById("profileEmail");

if (userNameEl) {
    userNameEl.textContent = firstName;
}

if (profileNameEl) {
    profileNameEl.textContent = fullName;
}

if (profileEmailEl) {
    profileEmailEl.textContent = user.email;
}

/*=========================================================
PREMIUM ACCESS
=========================================================*/

const hasAccess =
    profile.role === "admin" ||
    profile.premium === true;

togglePremiumModule(

    "setupModule",

    "setupPremiumLock",

    hasAccess

);

togglePremiumModule(

    "disciplineModule",

    "disciplinePremiumLock",

    hasAccess

);

}

checkSession();

/*=========================================================*
*MY PLAN*
*=========================================================*/

async function loadMyPlan() {

    if (!window.currentUserId) {
        console.warn("My Plan: User ID not available");
        return;
    }

    const myPlanName = document.getElementById("myPlanName");
    const myPlanStatus = document.getElementById("myPlanStatus");
    const myPlanStart = document.getElementById("myPlanStart");
    const myPlanExpiry = document.getElementById("myPlanExpiry");
    const myPlanAmount = document.getElementById("myPlanAmount");

    try {

        // PROFILE
        const profileResponse = await fetch(
            "/api/profile?user_id=" + window.currentUserId
        );

        if (!profileResponse.ok) {
            throw new Error("Profile API failed");
        }

        const profile = await profileResponse.json();

      
        // ADMIN PANEL ACCESS
const adminPanelBtn = document.getElementById("adminPanelBtn");

if (adminPanelBtn) {

    if (profile.role === "admin") {

        adminPanelBtn.style.display = "block";

        adminPanelBtn.onclick = () => {
            window.location.href = "admin.html";
        };

    } else {

        adminPanelBtn.style.display = "none";

    }
}

        // SUBSCRIPTIONS
        const subscriptionResponse = await fetch(
            "/api/subscriptions?user_id=" + window.currentUserId
        );

        if (!subscriptionResponse.ok) {
            throw new Error("Subscriptions API failed");
        }

        const subscriptions = await subscriptionResponse.json();


        // Latest subscription
        const latestSubscription =
            Array.isArray(subscriptions) && subscriptions.length > 0
                ? subscriptions[0]
                : null;


        // PLAN
        if (myPlanName) {

            myPlanName.textContent =
                profile.premium === true
                    ? (
                        profile.plan === "yearly"
                            ? "Premium Yearly"
                            : profile.plan === "6month"
                                ? "Premium 6 Month"
                                : "Premium"
                    )
                    : "Free";
        }


        // STATUS
        if (myPlanStatus) {

            myPlanStatus.textContent =
                profile.premium === true
                    ? "Active"
                    : "Inactive";
        }


        // START DATE
        if (myPlanStart) {

            myPlanStart.textContent =
                latestSubscription?.start_date
                    ? new Date(
                        latestSubscription.start_date
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    )
                    : "---";
        }


        // EXPIRY DATE
        if (myPlanExpiry) {

            const expiry =
                latestSubscription?.expiry_date ||
                profile.expiry;

            myPlanExpiry.textContent =
                expiry
                    ? new Date(expiry).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    )
                    : "---";
        }


        // AMOUNT
        if (myPlanAmount) {

            myPlanAmount.textContent =
                latestSubscription?.amount != null
                    ? "₹" + Number(
                        latestSubscription.amount
                    ).toLocaleString("en-IN")
                    : "---";
        }

    } catch (error) {

        console.error("My Plan Error:", error);

    }
}

loadMyPlan();

setTimeout(() => {
    loadMyPlan();
}, 500);

/*=========================================================
  MY PLAN BUTTON
=========================================================*/

const myPlanBtn = document.getElementById("myPlanBtn");
const myPlanDetails = document.getElementById("myPlanDetails");

if (myPlanBtn && myPlanDetails) {

    myPlanBtn.addEventListener("click", async function (e) {

        e.stopPropagation();

        if (myPlanDetails.style.display === "block") {

            myPlanDetails.style.display = "none";

        } else {

            myPlanDetails.style.display = "block";

            await loadMyPlan();

        }

    });

}

/*=========================================================
  MY PAYMENTS
=========================================================*/

const myPaymentsBtn = document.getElementById("myPaymentsBtn");
const myPaymentsDetails = document.getElementById("myPaymentsDetails");

async function loadMyPayments() {

    if (!myPaymentsDetails || !window.currentUserId) return;

    try {

        const response = await fetch(
            "/api/payments?user_id=" + window.currentUserId
        );

        const payments = await response.json();

        if (!Array.isArray(payments) || payments.length === 0) {

            myPaymentsDetails.innerHTML = `
                <div class="payment-empty-state">
                    <i class="fa-solid fa-receipt"></i>
                    <h4>No Payments Yet</h4>
                    <p>Your payment history will appear here.</p>
                </div>
            `;

            return;
        }

        myPaymentsDetails.innerHTML = `
            <div class="payments-list">

                ${payments.map(payment => {

                    const planName =
                        payment.plan === "yearly"
                            ? "Premium Yearly"
                            : payment.plan === "6month"
                                ? "Premium 6 Month"
                                : payment.plan || "---";

                    const paymentDate = payment.payment_date
                        ? new Date(payment.payment_date).toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }
                        )
                        : "---";

                    const amount = payment.amount != null
                        ? "₹" + Number(payment.amount).toLocaleString("en-IN")
                        : "---";

                    const status =
                        payment.payment_status || "---";

                    return `
                        <div class="payment-card">

                            <div class="payment-card-top">

                                <div>
                                    <strong>${planName}</strong>
                                    <span>${paymentDate}</span>
                                </div>

                                <strong>${amount}</strong>

                            </div>

                            <div class="payment-card-bottom">

                                <span>
                                    Status:
                                    <strong>${status}</strong>
                                </span>

                                <span>
                                    Payment ID:
                                    ${payment.razorpay_payment_id || "---"}
                                </span>

                            </div>

                        </div>
                    `;

                }).join("")}

            </div>
        `;

    } catch (error) {

        console.error("MY PAYMENTS ERROR:", error);

        myPaymentsDetails.innerHTML = `
            <div class="payment-empty-state">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <h4>Unable to Load Payments</h4>
                <p>Please try again.</p>
            </div>
        `;

    }
}


if (myPaymentsBtn && myPaymentsDetails) {

    myPaymentsBtn.addEventListener("click", async function (e) {

        e.stopPropagation();

        if (myPaymentsDetails.style.display === "block") {

            myPaymentsDetails.style.display = "none";

        } else {

            myPaymentsDetails.style.display = "block";

            await loadMyPayments();

        }

    });

}