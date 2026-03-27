const BASE_URL = "https://menu-pg-backend.onrender.com"; // 🔥 paste here
const list = document.getElementById("list");

async function loadMenus() {
    const res = await fetch(BASE_URL + "/menu");
    const data = await res.json();

    let html = "";

    data.forEach(m => {
        html += `
        <div class="menu-item">
            <b>${m.date}</b><br>
            🍳 ${m.breakfast}<br>
            🍛 ${m.lunch}<br>
            🍽 ${m.dinner}<br>

            <button onclick="deleteMenu('${m._id}')">Delete</button>
            <button onclick="editMenu('${m._id}')">Edit</button>
        </div>`;
    });

    list.innerHTML = html;
}

async function deleteMenu(id) {
    await fetch(BASE_URL + "/menu/" + id, { method: "DELETE" });
    loadMenus();
}

async function editMenu(id) {
    const breakfast = prompt("Breakfast");
    const lunch = prompt("Lunch");
    const dinner = prompt("Dinner");

    await fetch(BASE_URL + "/menu/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breakfast, lunch, dinner })
    });

    loadMenus();
}

loadMenus();