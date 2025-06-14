// Population Chart Configuration
const populationChartConfig = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Population (thousands)',
            data: [],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Population (thousands)'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                    }
                }
            }
        }
    }
};

// Economic Chart Configuration
const economicChartConfig = {
    type: 'radar',
    data: {
        labels: [],
        datasets: [{
            label: 'Economic Indicators',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
        }]
    },
    options: {
        responsive: true,
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0
            }
        }
    }
};

// Land Use Chart Configuration
const landuseChartConfig = {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: 'Land Use (%)',
            data: [],
            backgroundColor: [
                'rgba(76, 175, 80, 0.7)',
                'rgba(255, 235, 59, 0.7)',
                'rgba(121, 85, 72, 0.7)',
                'rgba(33, 150, 243, 0.7)'
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(121, 85, 72, 1)',
                'rgba(33, 150, 243, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }
};