function saveFootprint(day, nextPage) {
    const data = {
        transport_km: document.getElementById("transport_km").value || 0,
        transport_mode: document.getElementById("transport_mode").value,
        plastic_bottles: document.getElementById("plastic_bottles").value || 0,
        electricity_kwh: document.getElementById("electricity_kwh").value || 0,
        diet_type: document.getElementById("diet_type").value
    };

    // Save data to localStorage
    localStorage.setItem(day, JSON.stringify(data));

    // Navigate to the next page
    window.location.href = nextPage;
}

// Function to calculate the final weekly footprint
function calculateWeeklyFootprint() {
    let totalCarbon = 0;
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    days.forEach(day => {
        const data = JSON.parse(localStorage.getItem(day));
        if (data) {
            totalCarbon += calculateDailyFootprint(data);
        }
    });

    document.getElementById("weekly_result").innerHTML = `
        <h3>Your Total Weekly Carbon Footprint: ${totalCarbon.toFixed(2)} kg CO2</h3>
        <p>${compareWithAverage(totalCarbon)}</p>
    `;
}

// Function to calculate daily footprint based on stored data
function calculateDailyFootprint(data) {
    const CAR_EMISSION = 0.2;  // per km
    const BUS_EMISSION = 0.1;  // per km
    const PLASTIC_EMISSION = 0.05;  // per bottle
    const ELECTRICITY_EMISSION = 0.4;  // per kWh
    const MEAT_DIET = 7;
    const VEG_DIET = 4;
    const VEGAN_DIET = 2.5;

    let transportEmission = (data.transport_mode === "car" ? data.transport_km * CAR_EMISSION :
                             data.transport_mode === "bus" ? data.transport_km * BUS_EMISSION : 0);
                             
    let plasticEmission = data.plastic_bottles * PLASTIC_EMISSION;
    let electricityEmission = data.electricity_kwh * ELECTRICITY_EMISSION;
    let dietEmission = (data.diet_type === "meat" ? MEAT_DIET : 
                        data.diet_type === "vegetarian" ? VEG_DIET : VEGAN_DIET);

    return transportEmission + plasticEmission + electricityEmission + dietEmission;
}

// Compare with average
function compareWithAverage(totalCarbon) {
    const AVERAGE_WEEKLY = 70;  // Example average
    return totalCarbon > AVERAGE_WEEKLY ? 
        "⚠️ Your footprint is higher than the average. Try to reduce it!" : 
        "✅ Great job! Your footprint is lower than the average!";
}
