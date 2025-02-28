function calculateFootprint(day) {
    let transportKm = parseFloat(document.getElementById("transport_km").value) || 0;
    let transportMode = document.getElementById("transport_mode").value;
    let plasticBottles = parseInt(document.getElementById("plastic_bottles").value) || 0;
    let electricityKwh = parseFloat(document.getElementById("electricity_kwh").value) || 0;
    let dietType = document.getElementById("diet_type").value;

    let transportEmission = transportMode === "car" ? transportKm * 0.2 : transportMode === "bus" ? transportKm * 0.1 : 0;
    let plasticEmission = plasticBottles * 0.05;
    let electricityEmission = electricityKwh * 0.4;
    let dietEmission = dietType === "meat" ? 7 : dietType === "vegetarian" ? 4 : 2.5;

    let totalFootprint = transportEmission + plasticEmission + electricityEmission + dietEmission;

    document.getElementById("result").innerHTML = `<b>Your Carbon Footprint for ${day}:</b> ${totalFootprint.toFixed(2)} kg CO2`;

    // Store data in localStorage for weekly summary
    localStorage.setItem(`${day}Footprint`, totalFootprint);
}
