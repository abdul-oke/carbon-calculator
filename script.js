// Constants for emissions (kg CO2 per unit)
const CAR_EMISSION = 0.2;  // per km
const BUS_EMISSION = 0.1;  // per km
const PLASTIC_EMISSION = 0.05;  // per plastic bottle
const ELECTRICITY_EMISSION = 0.4;  // per kWh
const MEAT_DIET = 7;  // per day
const VEG_DIET = 4;   // per day
const VEGAN_DIET = 2.5;  // per day
const TREE_ABSORPTION_DAILY = 21 / 365;  // kg CO2 absorbed per tree per day

// Function to calculate carbon footprint and store in localStorage
function calculateAndSave(day) {
    try {
        let transport_km = parseFloat(document.getElementById("transport_km").value) || 0;
        let transport_mode = document.getElementById("transport_mode").value;
        let plastic_bottles = parseInt(document.getElementById("plastic_bottles").value) || 0;
        let electricity_kwh = parseFloat(document.getElementById("electricity_kwh").value) || 0;
        let diet_type = document.getElementById("diet_type").value;

        // Calculate transport emissions
        let transport_emission = transport_mode === "car" ? transport_km * CAR_EMISSION :
                                 transport_mode === "bus" ? transport_km * BUS_EMISSION : 0;

        // Calculate total daily emissions
        let daily_footprint = transport_emission + (plastic_bottles * PLASTIC_EMISSION) +
                              (electricity_kwh * ELECTRICITY_EMISSION) +
                              (diet_type === "meat" ? MEAT_DIET :
                               diet_type === "vegetarian" ? VEG_DIET : VEGAN_DIET);

        // Store daily footprint in localStorage
        localStorage.setItem(day, daily_footprint.toFixed(2));

        // Show the result for the day
        document.getElementById("result").innerHTML = `<b>${day} Carbon Footprint:</b> ${daily_footprint.toFixed(2)} kg CO2`;

    } catch (error) {
        console.error("Error calculating footprint:", error);
    }
}

// Function to display weekly results
function displayResults() {
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let totalFootprint = 0;
    let resultsHtml = "<h2>Weekly Carbon Footprint Report</h2><ul>";

    // Fetch stored footprints for each day
    days.forEach(day => {
        let dailyFootprint = parseFloat(localStorage.getItem(day)) || 0;
        totalFootprint += dailyFootprint;
        resultsHtml += `<li><b>${day}:</b> ${dailyFootprint.toFixed(2)} kg CO2</li>`;
    });

    resultsHtml += `</ul><h3>Total Weekly Carbon Footprint: ${totalFootprint.toFixed(2)} kg CO2</h3>`;

    // Compare with average carbon footprint
    let avgWeeklyFootprint = 140;  // Estimated average per person
    if (totalFootprint > avgWeeklyFootprint) {
        resultsHtml += `<p style="color: red;"><b>Your footprint is higher than the average person. Try reducing emissions!</b></p>`;
    } else {
        resultsHtml += `<p style="color: green;"><b>Great job! Your footprint is lower than average.</b></p>`;
    }

    // Generate tips based on high emissions
    resultsHtml += generateTips(totalFootprint);

    // Show results
    document.getElementById("weeklyResults").innerHTML = resultsHtml;
}

// Function to generate carbon footprint reduction tips
function generateTips(totalFootprint) {
    let tips = "<h3>How to Reduce Your Carbon Footprint:</h3><ul>";

    if (totalFootprint > 140) {
        tips += "<li>🚲 Consider biking or walking for short trips.</li>";
        tips += "<li>🚍 Use public transport instead of driving alone.</li>";
        tips += "<li>💡 Reduce electricity use by switching off unused devices.</li>";
        tips += "<li>🥦 Eat more plant-based meals to cut down on emissions.</li>";
        tips += "<li>🛍 Reduce plastic waste by using reusable bottles and bags.</li>";
    } else {
        tips += "<li>🌱 Keep up the good work! Continue making eco-friendly choices.</li>";
        tips += "<li>🔄 Encourage friends and family to lower their carbon footprint.</li>";
    }

    tips += "</ul>";
    return tips;
}

// Function to reset the weekly data and restart
function restartWeek() {
    localStorage.clear();
    window.location.href = "monday.html";
}

// Function to display ranking based on footprint
function displayRanking() {
    let totalFootprint = 0;
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Calculate total footprint
    days.forEach(day => {
        totalFootprint += parseFloat(localStorage.getItem(day)) || 0;
    });

    let rank = "🌱 Eco Hero!";  // Default best rank
    if (totalFootprint > 200) {
        rank = "🚨 High Carbon User!";
    } else if (totalFootprint > 140) {
        rank = "⚠️ Average User";
    }

    document.getElementById("ranking").innerHTML = `<h2>Your Rank: ${rank}</h2><p>Total Weekly Carbon Footprint: ${totalFootprint.toFixed(2)} kg CO2</p>`;
}
