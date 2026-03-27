// 🔥 IMPORTANT: change this to your Render link
const BASE_URL = "https://your-app.onrender.com"; 

async function addMenu() {
    // Get values
    const date = document.getElementById("date").value.trim();
    const breakfast = document.getElementById("breakfast").value.trim();
    const lunch = document.getElementById("lunch").value.trim();
    const dinner = document.getElementById("dinner").value.trim();

    // Debug (check in console)
    console.log("Sending:", { date, breakfast, lunch, dinner });

    // Validation
    if (!date || !breakfast || !lunch || !dinner) {
        alert("❌ Please fill all fields");
        return;
    }

    try {
        const response = await fetch(BASE_URL + "/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: date,
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner
            })
        });

        // If server not reachable
        if (!response) {
            alert("❌ Server not reachable");
            return;
        }

        const result = await response.json();
        console.log("Response:", result);

        if (response.ok) {
            alert("✅ Menu Added Successfully");

            // Clear inputs
            document.getElementById("date").value = "";
            document.getElementById("breakfast").value = "";
            document.getElementById("lunch").value = "";
            document.getElementById("dinner").value = "";
        } else {
            alert("❌ " + result.error);
        }

    } catch (error) {
        console.error("ERROR:", error);
        alert("❌ Cannot connect to server");
    }
}