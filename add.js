const BASE_URL = "https://menu-pg-backend.onrender.com"; // 🔥 replace with your link

async function addMenu() {
    const date = document.getElementById("date").value;
    const breakfast = document.getElementById("breakfast").value;
    const lunch = document.getElementById("lunch").value;
    const dinner = document.getElementById("dinner").value;

    console.log("DATA:", { date, breakfast, lunch, dinner }); // 🔍 debug

    // Validation
    if (!date || !breakfast || !lunch || !dinner) {
        alert("❌ Please fill all fields");
        return;
    }

    try {
        const res = await fetch(BASE_URL + "/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date,
                breakfast,
                lunch,
                dinner
            })
        });

        const data = await res.json();
        console.log("RESPONSE:", data);

        if (res.ok) {
            alert("✅ Menu Added Successfully");

            // Clear fields
            document.getElementById("date").value = "";
            document.getElementById("breakfast").value = "";
            document.getElementById("lunch").value = "";
            document.getElementById("dinner").value = "";
        } else {
            alert("❌ " + data.error);
        }

    } catch (err) {
        console.error("ERROR:", err);
        alert("❌ Server not reachable");
    }
}