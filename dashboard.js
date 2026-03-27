const BASE_URL = "https://menu-pg-backend.onrender.com"; // 🔥 paste here
const menuList = document.getElementById("menuList");

function getToday() {
    return new Date().toISOString().split("T")[0];
}

async function loadToday() {
    const res = await fetch(BASE_URL + "/menu");
    const data = await res.json();

    const today = getToday();
    const todayMenu = data.filter(m => m.date === today);

    let html = "";

    todayMenu.forEach(m => {
        html += `<li>${m.breakfast} | ${m.lunch} | ${m.dinner}</li>`;
    });

    menuList.innerHTML = html || "<li>No menu today</li>";
}

loadToday();