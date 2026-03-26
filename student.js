const container = document.getElementById("menuContainer");

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

async function loadMenu() {
    try {
        const res = await fetch("/menu");
        const data = await res.json();

        if (data.length === 0) {
            container.innerHTML = "<p class='empty'>No menu available</p>";
            return;
        }

        const today = getTodayDate();
        let foundToday = false;
        let html = "";

        data.forEach(m => {
            const isToday = m.date === today;

            if (isToday) foundToday = true;

            html += `
            <div class="menu-card ${isToday ? "highlight" : ""}">
                
                ${isToday ? '<div class="badge">Today</div>' : ""}

                <div class="date">📅 ${m.date}</div>

                <div class="meal"><span>🍳 Breakfast:</span> ${m.breakfast || "-"}</div>
                <div class="meal"><span>🍛 Lunch:</span> ${m.lunch || "-"}</div>
                <div class="meal"><span>🍽 Dinner:</span> ${m.dinner || "-"}</div>
            </div>`;
        });

        if (!foundToday) {
            container.innerHTML = "<p class='empty'>No menu for today</p>";
            return;
        }

        container.innerHTML = html;

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p class='empty'>Error loading menu</p>";
    }
}

loadMenu();