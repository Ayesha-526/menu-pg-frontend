const BASE_URL = "https://menu-pg-backend.onrender.com"; // 🔥 paste here
const container = document.getElementById("menuContainer");

function getToday() {
    return new Date().toISOString().split("T")[0];
}

async function loadMenus() {
    const res = await fetch(BASE_URL + "/menu");
    const data = await res.json();

    const today = getToday();

    let html = "";

    data.forEach(m => {
        const isToday = m.date === today;

        html += `
        <div class="${isToday ? "highlight" : ""}">
            <b>${m.date}</b><br>
            🍳 ${m.breakfast}<br>
            🍛 ${m.lunch}<br>
            🍽 ${m.dinner}
        </div>`;
    });

    container.innerHTML = html;
}

loadMenus();