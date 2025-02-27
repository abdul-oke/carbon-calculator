const CAR_EMISSION = 0.2, BUS_EMISSION = 0.1, PLASTIC_EMISSION = 0.05, ELECTRICITY_EMISSION = 0.4;
const MEAT_DIET = 7, VEG_DIET = 4, VEGAN_DIET = 2.5, TREE_ABSORPTION_DAILY = 21 / 365;
const AVERAGE_WEEKLY_FOOTPRINT = 150;  // Example: Avg person emits 150 kg CO2 per week

function calculateFootprint() {
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

    let daily_footprint = transport_emission + plastic_emission + electricity_emission + diet_emission;
    let currentDay = localStorage.getItem("currentDay");
    
    localStorage.setItem(currentDay, daily_footprint);
    let nextDay = getNextDay(currentDay);
    
    if (nextDay) {
        localStorage.setItem("currentDay", nextDay);
        window.location.href = nextDay.toLowerCase() + ".html";  // Redirect to next day
    } else {
        window.location.href = "summary.html";  // Redirect to final results
    }
}

function getNextDay(currentDay) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let index = days.indexOf(currentDay);
    return index < 6 ? days[index + 1] : null;
}
