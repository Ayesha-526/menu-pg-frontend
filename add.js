const BASE_URL = "https://menu-pg-backend.onrender.com"; // 🔥 paste here

async function addMenu() {
    const date = document.getElementById("date").value;
    const breakfast = document.getElementById("breakfast").value;
    const lunch = document.getElementById("lunch").value;
    const dinner = document.getElementById("dinner").value;

    if (!date || !breakfast || !lunch || !dinner) {
        alert("Fill all fields");
        return;
    }

    const res = await fetch(BASE_URL + "/menu", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ date, breakfast, lunch, dinner })
    });

    const data = await res.json();
    alert(data.message || data.error);
}