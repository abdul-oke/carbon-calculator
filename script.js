const carbonData = {
    car: 0.2, 
    bus: 0.1, 
    plastic: 0.05, 
    electricity: 0.4, 
    meat: 7, 
    vegetarian: 4, 
    vegan: 2.5, 
    tree_absorption: 21 / 365
};

function calculateAndSave(day, nextPage) {
    let transportKm = parseFloat(document.getElementById("transport_km").value) || 0;
    let transportMode = document.getElementById("transport_mode").value;
    let plastic = parseInt(document.getElementById("plastic_bottles").value) || 0;
    let electricity = parseFloat(document.getElementById("electricity_kwh").value) || 0;
    let diet = document.getElementById("diet_type").value;

    let footprint = transportKm * carbonData[transportMode] + 
                    plastic * carbonData.plastic + 
                    electricity * carbonData.electricity + 
                    carbonData[diet];

    localStorage.setItem(day, footprint);
    window.location.href = nextPage;
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("weeklyTotal")) {
        let total = 0;
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach(day => {
            total += parseFloat(localStorage.getItem(day)) || 0;
        });
        document.getElementById("weeklyTotal").textContent = total.toFixed(2);
        document.getElementById("weeklyFootprint").textContent = total.toFixed(2);
        document.getElementById("rank").textContent = total < 100 ? "Eco Warrior 🌿" : "High Emitter 🚨";
    }
});

function restartWeek() {
    localStorage.clear();
    window.location.href = "monday.html";
}
