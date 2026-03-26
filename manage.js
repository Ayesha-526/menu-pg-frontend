const list = document.getElementById("list");

async function load() {
    const res = await fetch("/menu");
    const data = await res.json();

    if (data.length === 0) {
        list.innerHTML = "<p>No menu available</p>";
        return;
    }

    let html = "";

    data.forEach(m => {
        html += `
        <div class="menu-item">
            <div>
                <b>${m.date}</b><br>
                🍳 ${m.breakfast}<br>
                🍛 ${m.lunch}<br>
                🍽 ${m.dinner}
            </div>

            <div>
                <button onclick="editMenu('${m._id}')">Edit</button>
                <button onclick="deleteMenu('${m._id}')">Delete</button>
            </div>
        </div>`;
    });

    list.innerHTML = html;
}

// DELETE
async function deleteMenu(id) {
    await fetch("/menu/" + id, { method: "DELETE" });
    load();
}

// EDIT
async function editMenu(id) {
    const breakfast = prompt("Breakfast:");
    const lunch = prompt("Lunch:");
    const dinner = prompt("Dinner:");

    await fetch("/menu/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breakfast, lunch, dinner })
    });

    load();
}

load();