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

        localStorage.setItem('weeklyTotal', total);
        document.getElementById("weeklyTotal").textContent = total.toFixed(2);
        document.getElementById("weeklyFootprint").textContent = total.toFixed(2);

        let rank = "";
        if (total <= 50) rank = "🌱 Eco-Warrior";
        else if (total <= 100) rank = "🌿 Climate Conscious";
        else if (total <= 150) rank = "⚡ Average Person";
        else rank = "🔥 High Carbon Emitter";

        document.getElementById("rank").textContent = rank;
    }

    if (document.getElementById("tipsList")) {
        let total = parseFloat(localStorage.getItem('weeklyTotal')) || 0;
        let tips = [];

        if (total > 150) {
            tips.push("🚴 Consider biking or walking instead of using a car.");
            tips.push("💡 Reduce electricity use—turn off lights and unplug devices.");
        } else if (total > 100) {
            tips.push("🥦 Try eating more plant-based meals.");
            tips.push("🔋 Use energy-efficient appliances.");
        } else if (total > 50) {
            tips.push("🛍️ Reduce plastic waste by using reusable bags.");
        } else {
            tips.push("👏 Keep up the great work! Share your habits with friends.");
        }

        document.getElementById("tipsList").innerHTML = tips.map(t => `<li>${t}</li>`).join("");
    }
});

function restartWeek() {
    localStorage.clear();
    window.location.href = "monday.html";
}
