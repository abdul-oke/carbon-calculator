function calculateFootprint() {
    const transport_km = Math.max(parseFloat(document.getElementById("transport_km").value) || 0, 0);
    const transport_mode = document.getElementById("transport_mode").value;
    const plastic_bottles = Math.max(parseInt(document.getElementById("plastic_bottles").value) || 0, 0);
    const electricity_kwh = Math.max(parseFloat(document.getElementById("electricity_kwh").value) || 0, 0);
    const diet_type = document.getElementById("diet_type").value;

    // Constants (kg CO2 per unit)
    const EMISSIONS = { car: 0.2, bus: 0.1, bike: 0.0 };
    const DIET_EMISSIONS = { meat: 7, vegetarian: 4, vegan: 2.5 };
    const PLASTIC_EMISSION = 0.05;
    const ELECTRICITY_EMISSION = 0.4;
    const TREE_ABSORPTION_DAILY = 21 / 365;  // kg CO2 per tree per day

    // Calculate emissions
    const transport_emission = transport_km * (EMISSIONS[transport_mode] || 0);
    const diet_emission = DIET_EMISSIONS[diet_type] || 7;
    const total_footprint = transport_emission + (plastic_bottles * PLASTIC_EMISSION) + 
                            (electricity_kwh * ELECTRICITY_EMISSION) + diet_emission;

    // Trees needed (rounded up)
    const trees_needed_daily = Math.ceil(total_footprint / TREE_ABSORPTION_DAILY);
    const trees_needed_weekly = Math.ceil((total_footprint * 7) / TREE_ABSORPTION_DAILY);
    const trees_needed_monthly = Math.ceil((total_footprint * 30) / TREE_ABSORPTION_DAILY);

    document.getElementById("result").innerHTML = `
        <b>Your Daily Carbon Footprint:</b> ${total_footprint.toFixed(2)} kg CO2 <br>
        <b>🌳 Trees Needed Per Day:</b> ${trees_needed_daily} <br>
        <b>🌲 Trees Needed Per Week:</b> ${trees_needed_weekly} <br>
        <b>🌴 Trees Needed Per Month:</b> ${trees_needed_monthly}
    `;
}
