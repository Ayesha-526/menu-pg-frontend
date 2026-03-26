const container = document.getElementById("menuContainer");

function getToday() {
    return new Date().toISOString().split("T")[0];
}

async function loadMenu() {
    const res = await fetch("/menu");
    const data = await res.json();

    const today = getToday();

    let html = "";
    let found = false;

    data.forEach(m => {
        const isToday = m.date === today;

        if (isToday) found = true;

        html += `
        <div class="menu-card ${isToday ? "highlight" : ""}">
            ${isToday ? "<div class='badge'>Today</div>" : ""}
            <p><b>${m.date}</b></p>
            <p>🍳 ${m.breakfast}</p>
            <p>🍛 ${m.lunch}</p>
            <p>🍽 ${m.dinner}</p>
        </div>`;
    });

    if (!found) {
        container.innerHTML = "<p>No menu for today</p>";
        return;
    }

    container.innerHTML = html;
}

loadMenu();