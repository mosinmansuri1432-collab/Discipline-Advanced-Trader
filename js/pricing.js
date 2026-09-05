

console.log("Pricing.js Loaded");

const RAZORPAY_KEY_ID = "rzp_live_TNfh05O7Puz47b";

const planDetails = {

    "6month": {
        amount: 1000,
        name: "SANA  VISIONARY TRADER - 6 Months",
        description: "Premium subscription for 6 months"
    },

    "yearly": {
        amount: 1500,
        name: "SANA  VISIONARY TRADER - 1 Year",
        description: "Premium subscription for 1 year"
    }

};

document.querySelectorAll(".plan-btn").forEach(button => {

    button.addEventListener("click", async () => {
     
      console.log("Upgrade Button Clicked");

        const plan = button.dataset.plan;
       
       console.log("Selected Plan:", plan);

        const selectedPlan = planDetails[plan];

        if (!selectedPlan) {
            alert("Invalid plan selected.");
            return;
        }

        try {

            const response = await fetch("/api/create-order", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    amount: selectedPlan.amount,
                    plan: plan
                })

            });

            const order = await response.json();

            if (!response.ok || !order.id) {

                console.error(order);

                alert("Unable to create payment order.");

                return;
            }

            const options = {

                key: RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: "INR",

                name: "SANA  VISIONARY TRADER",

                description: selectedPlan.description,

                order_id: order.id,

                handler: async function (payment) {

                console.log("Payment Handler Started");
                console.log("CLIENT TYPE:", typeof client);

                console.log("CLIENT TYPE:", typeof client);  

                const { data } = await client.auth.getUser();

                 const user = data.user;
                 
                  console.log("Current User:", user);
                  console.log("User ID:", user?.id);

                 if (!user) {
                 alert("User not logged in.");
                 return;
               }

                    console.log("Payment successful:", payment);

                    const verifyResponse =
                        await fetch("/api/verify-payment", {

                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                           body: JSON.stringify({
                            ...payment,
                            user_id: user.id,
                           plan: plan,
                          amount: selectedPlan.amount
                         })

                        });

                    const result =
                        await verifyResponse.json();

                    if (result.success) {

                        alert("Payment successful!");

                    } else {

                        alert("Payment verification failed.");

                    }

                },

                theme: {
                    color: "#3399cc"
                }

            };

            const razorpay =
                new Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.error("Payment Error:", error);

            alert("Something went wrong.");

        }

    });

});