// Constants for emissions
const CAR_EMISSION = 0.2;
const BUS_EMISSION = 0.1;
const PLASTIC_EMISSION = 0.05;
const ELECTRICITY_EMISSION = 0.4;
const MEAT_DIET = 7;
const VEG_DIET = 4;
const VEGAN_DIET = 2.5;
const TREE_ABSORPTION_DAILY = 21 / 365;
const AVERAGE_WEEKLY_CARBON = 50;  // Example avg footprint

// Save daily data
function saveFootprint(day, nextPage) {
    let transport_km = parseFloat(document.getElementById("transport_km").value) || 0;
    let transport_mode = document.getElementById("transport_mode").value;
    let plastic_bottles = parseInt(document.getElementById("plastic_bottles").value) || 0;
    let electricity_kwh = parseFloat(document.getElementById("electricity_kwh").value) || 0;
    let diet_type = document.getElementById("diet_type").value;

    let transport_emission = transport_mode === "car" ? transport_km * CAR_EMISSION :
                             transport_mode === "bus" ? transport_km * BUS_EMISSION : 0;

    let daily_footprint = transport_emission + 
                          plastic_bottles * PLASTIC_EMISSION + 
                          electricity_kwh * ELECTRICITY_EMISSION +
                          (diet_type === "meat" ? MEAT_DIET : diet_type === "vegetarian" ? VEG_DIET : VEGAN_DIET);

    localStorage.setItem(day, daily_footprint);
    window.location.href = nextPage;
}

// Weekly calculation
if (window.location.pathname.includes("results.html")) {
    let totalFootprint = 0;
    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].forEach(day => {
        totalFootprint += parseFloat(localStorage.getItem(day)) || 0;
    });

    let comparison = totalFootprint > AVERAGE_WEEKLY_CARBON ? "higher ❌" : "lower ✅";
    document.getElementById("summary").innerHTML = `
        <b>Your Weekly Carbon Footprint:</b> ${totalFootprint.toFixed(2)} kg CO₂<br>
        <b>Compared to average:</b> Your footprint is ${comparison} than the average.<br>
        <b>Trees Needed to Offset:</b> ${Math.ceil(totalFootprint / TREE_ABSORPTION_DAILY)}
    `;
}

// Reset data
function resetData() {
    localStorage.clear();
    window.location.href = "monday.html";
}
