// Initialize the map centered on Sumatra
const map = L.map('map-container').setView([-0.5, 101.5], 6);

// Add base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variables to store our layers and charts
let provincesLayer;
let populationChart, economicChart, landuseChart;

// Function to style the provinces
function styleProvince(feature) {
    return {
        fillColor: '#1e88e5',
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

// Function to highlight province on hover
function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#ffeb3b',
        fillOpacity: 0.9
    });
    layer.bringToFront();
}

// Function to reset highlight
function resetHighlight(e) {
    provincesLayer.resetStyle(e.target);
}

// Function to zoom to province on click
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds(), { padding: [50, 50] });
}

// Function to show province info
function showProvinceInfo(e) {
    const province = e.target.feature.properties;
    updateCharts(province);
    document.getElementById('sidebar').classList.add('active');
}

// Add event listeners to each province
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: showProvinceInfo
    });
}

// Load the GeoJSON data
fetch('sumatra_fix.geojson')
    .then(response => response.json())
    .then(data => {
        // Add GeoJSON layer to the map
        provincesLayer = L.geoJSON(data, {
            style: styleProvince,
            onEachFeature: onEachFeature
        }).addTo(map);
        
        // Fit map to the bounds of Sumatra
        map.fitBounds(provincesLayer.getBounds());
    })
    .catch(error => {
        console.error('Error loading GeoJSON data:', error);
    });

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get chart contexts
    const populationCtx = document.getElementById('population-chart').getContext('2d');
    const economicCtx = document.getElementById('economic-chart').getContext('2d');
    const landuseCtx = document.getElementById('landuse-chart').getContext('2d');
    
    // Initialize charts with empty data
    populationChart = new Chart(populationCtx, populationChartConfig);
    economicChart = new Chart(economicCtx, economicChartConfig);
    landuseChart = new Chart(landuseCtx, landuseChartConfig);
    
    // Close sidebar event
    document.getElementById('close-sidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('active');
    });
});

// Function to update charts with province data
function updateCharts(province) {
    // Update population chart
    populationChart.data.labels = ['Total Population', 'Urban Population', 'Rural Population'];
    populationChart.data.datasets[0].data = [
        province.pop_tot,
        province.pop_ur,
        province.pop_rur
    ];
    populationChart.update();
    
    // Update economic chart
    economicChart.data.labels = ['GDP (Billion IDR)', 'Poverty Rate (%)', 'Unemployment Rate (%)'];
    economicChart.data.datasets[0].data = [
        province.gdp / 1000,
        province.pov_rate,
        province.unemp_rate
    ];
    economicChart.update();
    
    // Update land use chart
    landuseChart.data.labels = ['Forest Area', 'Agricultural Land', 'Urban Area', 'Water Bodies'];
    landuseChart.data.datasets[0].data = [
        province.land_frst,
        province.land_agri,
        province.land_urban,
        province.land_water
    ];
    landuseChart.update();
    
    // Update sidebar title
    document.querySelector('.sidebar-header h2').textContent = `${province.PROVINSI} Statistics`;
}