const menuList = document.getElementById("menuList");

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

async function loadTodayMenu() {
    try {
        const res = await fetch("/menu");
        const data = await res.json();

        const today = getTodayDate();

        menuList.innerHTML = "";

        const todayMenus = data.filter(m => m.date === today);

        if (todayMenus.length === 0) {
            menuList.innerHTML = "<li>No menu for today</li>";
            return;
        }

        todayMenus.forEach(m => {
            const li = document.createElement("li");
            li.className = "menu-item";

            li.innerHTML = `
                🍳 ${m.breakfast || "-"} |
                🍛 ${m.lunch || "-"} |
                🍽 ${m.dinner || "-"}
            `;

            menuList.appendChild(li);
        });

    } catch (err) {
        console.error(err);
        menuList.innerHTML = "<li>Error loading menu</li>";
    }
}

loadTodayMenu();