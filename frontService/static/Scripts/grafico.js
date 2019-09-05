$('#recived').on('change', function (evt) {
        console.log(evt);
        var valor=jQuery(this).val();
        var tiempo=new Date();
        var hora= tiempo.getHours()+':'+tiempo.getMinutes()+':'+tiempo.getSeconds();
        addData(myChart,hora,valor );
    })
$('#boton').click(function (evt) {
    var tiempo=new Date();
    var hora= tiempo.getHours()+':'+tiempo.getMinutes()+':'+tiempo.getSeconds();
    addData(myChart,hora,Math.floor(Math.random() * 100) );
})
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nivel de agresión actual',
            data: [],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
    scales: {
        yAxes: [{
            scaleLabel: {
                    display: true,
                    labelString: 'probabilidad de agresión'
                  },
            ticks: {

                beginAtZero: true
            }
        }],
        xAxes: [{
            scaleLabel: {
                    display: true,
                    labelString: 'Hora'
                  },

        }]

    }
}
});
console.log(myChart);
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    if(chart.data.labels.length>=30){
        chart.data.labels.shift();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });

    }
    chart.update();
}
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
		}