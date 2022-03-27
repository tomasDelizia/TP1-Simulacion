export default function dibujarGrafico(dataLabels, dataValues) {
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dataLabels,
        datasets: [{
        label: 'Group A',
        data: dataValues,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        }]
    },
    options: {
        scales: {
        xAxes: {
            display: false,
            barPercentage: 1.3,
            ticks: {
                max: 3,
            }
        },
        x: {
            display: true,
            ticks: {
                autoSkip: false,
                max: 4,
            }
        },
        yAxes: [{
            ticks: {
            beginAtZero:true
            }
        }]
        }
    }
    });
    return myChart;
}