// Make function global (IMPORTANT)
window.addMenu = async function () {
    const date = document.getElementById("date").value;
    const breakfast = document.getElementById("breakfast").value;
    const lunch = document.getElementById("lunch").value;
    const dinner = document.getElementById("dinner").value;

    console.log("Clicked button"); // 🔥 check if click works

    if (!date || !breakfast || !lunch || !dinner) {
        alert("Fill all fields");
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

        const data = await res.json();

        alert(data.message || data.error);

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
};