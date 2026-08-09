
console.log("Admin.js Loaded");

async function loadTotalUsers() {

const { data: userData } = await client.auth.getUser();

console.log("ADMIN PAGE USER:", userData.user);
console.log("ADMIN PAGE USER ID:", userData.user?.id);

    const { count, error } = await client
        .from("profiles")
        .select("id", { count: "exact", head: true });

console.log("Profiles Count:", count);
console.log("Profiles Error:", error);

    if (error) {
        console.error("Total Users Error:", error);
        return;
    }

    document.getElementById("totalUsers").textContent = count ?? 0;
}

loadTotalUsers();

async function loadPremiumUsers() {

    const { count, error } = await client
        .from("profiles")
        .select("id", {
            count: "exact",
            head: true
        })
        .eq("premium", true);

    console.log("Premium Users Count:", count);
    console.log("Premium Users Error:", error);

    if (error) {
        console.error("Premium Users Error:", error);
        return;
    }

    document.getElementById("premiumUsers").textContent = count ?? 0;
}

loadPremiumUsers();

async function loadActiveSubscriptions() {

    const { count, error } = await client
        .from("profiles")
        .select("id", {
            count: "exact",
            head: true
        })
        .eq("premium", true)
        .gt("expiry", new Date().toISOString());

    console.log("Active Subscriptions Count:", count);
    console.log("Active Subscriptions Error:", error);

    if (error) {
        console.error("Active Subscriptions Error:", error);
        return;
    }

    document.getElementById("activeSubscriptions").textContent = count ?? 0;
}

loadActiveSubscriptions();

async function loadUsers() {

    const { data, error } = await client
        .from("profiles")
        .select("id, name, email, role, plan, premium, expiry")
        .order("created_at", { ascending: false });

    console.log("Users Data:", data);
    console.log("Users Error:", error);

    if (error) {
        console.error("Users Load Error:", error);
        return;
    }

    const tableBody = document.getElementById("usersTableBody");

    tableBody.innerHTML = "";

    data.forEach(user => {

        const row = document.createElement("tr");

        row.innerHTML = `

    <td>${user.name ?? "-"}</td>
    <td>${user.email ?? "-"}</td>
    <td>${user.role ?? "-"}</td>
    <td>${user.plan ?? "-"}</td>
    <td>${user.premium ? "Premium" : "Free"}</td>
    <td>${user.expiry ? new Date(user.expiry).toLocaleDateString() : "-"}</td>
    <td>
       <button class="view-user-btn">View</button>
       <button class="edit-user-btn">Edit</button>
       
    </td>
`;

const editButton = row.querySelector(".edit-user-btn");

editButton.addEventListener("click", () => {

    console.log("Edit User:", user);

    const editForm = document.getElementById("editUserForm");

    editForm.innerHTML = `
        <h3>Edit User</h3>

        <label>Name</label>
        <input type="text" id="editName" value="${user.name ?? ""}">

        <label>Email</label>
        <input type="email" id="editEmail" value="${user.email ?? ""}">

        <label>Role</label>
        <input type="text" id="editRole" value="${user.role ?? ""}">

        <label>Plan</label>
        <input type="text" id="editPlan" value="${user.plan ?? ""}">

        <label>Premium</label>
        <select id="editPremium">
            <option value="true" ${user.premium ? "selected" : ""}>Premium</option>
            <option value="false" ${!user.premium ? "selected" : ""}>Free</option>
        </select>

        <label>Expiry</label>
        <input type="datetime-local" id="editExpiry"
            value="${user.expiry ? new Date(user.expiry).toISOString().slice(0,16) : ""}">

            <button id="saveUserChanges">Save Changes</button>
    `;

    const saveButton = document.getElementById("saveUserChanges");

saveButton.addEventListener("click", async () => {

    const updatedUser = {
        name: document.getElementById("editName").value,
        email: document.getElementById("editEmail").value,
        role: document.getElementById("editRole").value,
        plan: document.getElementById("editPlan").value,
        premium: document.getElementById("editPremium").value === "true",
        expiry: document.getElementById("editExpiry").value
    };

    console.log("Updated User Data:", updatedUser);

const { error } = await client
    .from("profiles")
    .update({
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        plan: updatedUser.plan,
        premium: updatedUser.premium,
        expiry: updatedUser.expiry || null
    })
    .eq("id", user.id);

if (error) {
    console.error("Update User Error:", error);
    alert("User update failed.");
    return;
}

console.log("USER UPDATED SUCCESSFULLY");
alert("User updated successfully.");


});

});

const viewButton = row.querySelector(".view-user-btn");

viewButton.addEventListener("click", () => {

    console.log("Selected User:", user);

    const userDetails = document.getElementById("userDetails");

    userDetails.innerHTML = `
        <div>
            <strong>Name:</strong> ${user.name ?? "-"}
        </div>

        <div>
            <strong>Email:</strong> ${user.email ?? "-"}
        </div>

        <div>
            <strong>Role:</strong> ${user.role ?? "-"}
        </div>

        <div>
            <strong>Plan:</strong> ${user.plan ?? "-"}
        </div>

        <div>
            <strong>Status:</strong> ${user.premium ? "Premium" : "Free"}
        </div>

        <div>
            <strong>Expiry:</strong>
            ${user.expiry ? new Date(user.expiry).toLocaleDateString() : "-"}
        </div>
    `;
});

        tableBody.appendChild(row);

    });
}

loadUsers();












