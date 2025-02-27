function calculateWeeklyFootprint() {
    let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    let values = [];

    let totalFootprint = 0;
    for (let i = 0; i < days.length; i++) {
        let val = parseFloat(document.getElementById(days[i]).value) || 0;
        values.push(val);
        totalFootprint += val;
        localStorage.setItem(days[i], val);
    }

    let avgFootprint = (totalFootprint / 7).toFixed(2);
    let avgPerson = 7 * 6; // Example average person emits 6kg per day

    let tip = "Great job! Keep reducing your carbon footprint.";
    if (avgFootprint > 8) tip = "Try using public transport or reducing electricity use.";
    else if (avgFootprint > 5) tip = "Consider reducing meat consumption or using reusable items.";

    document.getElementById("result").innerHTML = `
        <b>Total Weekly Carbon Footprint:</b> ${totalFootprint} kg CO2 <br>
        <b>Daily Average:</b> ${avgFootprint} kg CO2 <br>
        <b>🌱 Tip:</b> ${tip} <br>
        <b>⚖️ Compared to an average person:</b> ${totalFootprint} kg vs. ${avgPerson} kg
    `;

    drawCharts(values);
}

function resetData() {
    localStorage.clear();
    location.reload();
}

window.onload = function() {
    let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    for (let day of days) {
        let savedVal = localStorage.getItem(day);
        if (savedVal !== null) document.getElementById(day).value = savedVal;
    }
};
