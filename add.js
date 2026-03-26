async function addMenu() {
    const date = document.getElementById("date").value;
    const breakfast = document.getElementById("breakfast").value;
    const lunch = document.getElementById("lunch").value;
    const dinner = document.getElementById("dinner").value;

    if (!date || !breakfast || !lunch || !dinner) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ date, breakfast, lunch, dinner })
        });

        if (res.ok) {
            alert("✅ Menu Added!");

            // Clear fields
            document.getElementById("date").value = "";
            document.getElementById("breakfast").value = "";
            document.getElementById("lunch").value = "";
            document.getElementById("dinner").value = "";
        } else {
            alert("Error adding menu");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}