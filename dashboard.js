const menuList = document.getElementById("menuList");

function getToday() {
    return new Date().toISOString().split("T")[0];
}

async function loadToday() {
    const res = await fetch("/menu");
    const data = await res.json();

    const today = getToday();

    const todayMenu = data.filter(m => m.date === today);

    if (todayMenu.length === 0) {
        menuList.innerHTML = "<li>No menu for today</li>";
        return;
    }

    let html = "";

    todayMenu.forEach(m => {
        html += `
        <li>
            🍳 ${m.breakfast} |
            🍛 ${m.lunch} |
            🍽 ${m.dinner}
        </li>`;
    });

    menuList.innerHTML = html;
}

loadToday();