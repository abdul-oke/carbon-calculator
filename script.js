const CAR_EMISSION = 0.2, BUS_EMISSION = 0.1, PLASTIC_EMISSION = 0.05, ELECTRICITY_EMISSION = 0.4;
const MEAT_DIET = 7, VEG_DIET = 4, VEGAN_DIET = 2.5, TREE_ABSORPTION_DAILY = 21 / 365;

function calculateDailyFootprint(day) {
    let transport_km = parseFloat(document.getElementById("transport_km").value) || 0;
    let transport_mode = document.getElementById("transport_mode").value;
    let plastic_bottles = parseInt(document.getElementById("plastic_bottles").value) || 0;
    let electricity_kwh = parseFloat(document.getElementById("electricity_kwh").value) || 0;
    let diet_type = document.getElementById("diet_type").value;

    let transport_emission = transport_mode === "car" ? transport_km * CAR_EMISSION :
                             transport_mode === "bus" ? transport_km * BUS_EMISSION : 0;
    let plastic_emission = plastic_bottles * PLASTIC_EMISSION;
    let electricity_emission = electricity_kwh * ELECTRICITY_EMISSION;
    let diet_emission = diet_type === "meat" ? MEAT_DIET : diet_type === "vegetarian" ? VEG_DIET : VEGAN_DIET;
    
    let total_footprint = transport_emission + plastic_emission + electricity_emission + diet_emission;
    
    localStorage.setItem(day, total_footprint);
    
    document.getElementById("result").innerHTML = `Your carbon footprint for ${day}: <b>${total_footprint.toFixed(2)} kg CO2</b>`;
}

function showWeeklyReport() {
    let total = 0;
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    days.forEach(day => {
        let dailyFootprint = parseFloat(localStorage.getItem(day)) || 0;
        total += dailyFootprint;
    });

    document.getElementById("total-footprint").innerText = total.toFixed(2) + " kg CO2";
    
    let comparison = total > 100 ? "⚠️ Your footprint is higher than average. Try reducing emissions!" :
                   "✅ Great job! Your carbon footprint is lower than the average person.";
    document.getElementById("comparison").innerHTML = `<b>${comparison}</b>`;

    let tips = [
        "Use public transport instead of cars.",
        "Reduce plastic waste by using reusable bottles.",
        "Turn off lights and appliances when not in use.",
        "Eat more plant-based meals to reduce emissions."
    ];

    let tipsList = document.getElementById("tips-list");
    tips.forEach(tip => {
        let li = document.createElement("li");
        li.innerText = tip;
        tipsList.appendChild(li);
    });

    localStorage.clear();
}
