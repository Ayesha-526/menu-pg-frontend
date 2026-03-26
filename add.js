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

        const data = await res.json();

        if (res.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}