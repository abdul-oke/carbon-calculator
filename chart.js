function drawCharts(values) {
    let ctxBar = document.getElementById("barChart").getContext("2d");
    if (window.barChart) window.barChart.destroy();
    window.barChart = new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Daily Carbon Footprint (kg CO2)",
                data: values,
                backgroundColor: "#2d6a4f",
            }]
        }
    });

    let ctxLine = document.getElementById("lineChart").getContext("2d");
    if (window.lineChart) window.lineChart.destroy();
    window.lineChart = new Chart(ctxLine, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Trend of Carbon Footprint",
                data: values,
                borderColor: "#2d6a4f",
                fill: false
            }]
        }
    });
}
