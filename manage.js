const list = document.getElementById("list");

async function load() {
    try {
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
                <div class="menu-text">
                    <strong>${m.date}</strong><br>
                    🍳 ${m.breakfast || "-"} <br>
                    🍛 ${m.lunch || "-"} <br>
                    🍽 ${m.dinner || "-"}
                </div>

                <div class="actions">
                    <button class="edit-btn" onclick="editMenu('${m._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteMenu('${m._id}')">Delete</button>
                </div>
            </div>`;
        });

        list.innerHTML = html;

    } catch (err) {
        console.error(err);
        list.innerHTML = "<p>Error loading menu</p>";
    }
}

// Delete
async function deleteMenu(id) {
    if (!confirm("Delete this menu?")) return;

    await fetch("/menu/" + id, { method: "DELETE" });
    load();
}

// Edit
async function editMenu(id) {
    const breakfast = prompt("Breakfast");
    const lunch = prompt("Lunch");
    const dinner = prompt("Dinner");

    if (!breakfast && !lunch && !dinner) {
        alert("No changes made");
        return;
    }

    await fetch("/menu/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breakfast, lunch, dinner })
    });

    load();
}

load();