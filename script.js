function calculateFootprint() {
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

    document.getElementById("result").innerHTML = `<b>Your Daily Carbon Footprint:</b> ${totalFootprint.toFixed(2)} kg CO2`;

    // Generate Suggestions
    let suggestions = [];

    if (transportMode === "car" && transportKm > 10) {
        suggestions.push("🚶‍♂️ Consider walking, biking, or using public transport for short distances.");
    }
    if (electricityKwh > 5) {
        suggestions.push("💡 Reduce electricity use by turning off unused lights and using energy-efficient appliances.");
    }
    if (plasticBottles > 2) {
        suggestions.push("♻️ Use reusable bottles instead of plastic to reduce waste.");
    }
    if (dietType === "meat") {
        suggestions.push("🌱 Try incorporating more plant-based meals to reduce carbon emissions.");
    }

    document.getElementById("suggestions").innerHTML = suggestions.length > 0 
        ? `<b>Ways to Reduce:</b> <ul><li>${suggestions.join("</li><li>")}</li></ul>` 
        : "✅ You're doing great! Keep it up!";

    // Store data in localStorage for weekly summary
    localStorage.setItem("mondayFootprint", totalFootprint);
}
