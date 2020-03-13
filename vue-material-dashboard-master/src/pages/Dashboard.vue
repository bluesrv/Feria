<template>
  <div class="content">
     <button class="button_download" v-on:click = "download_csv () " > Descargar CSV </button>  
  
      <!-- Graficos total -->
      <h2>Graficos Salas </h2>
      <div class="row">
        <div class="viewport_">
          <div class="row" style="text-align: center;font-size:23px">
            Alarmas por mes
          </div>
        <mdb-container>
          <mdb-line-chart
            :data="lineChartData"
            :options="lineChartOptions"
            :width="auto"
            :height="300"
          ></mdb-line-chart>
          </mdb-container>
        </div>
        <div class="viewport_">
          <div class="row" style="text-align: center;font-size:23px">
            Alarmas por mes
          </div>
          <mdb-container>
            <mdb-pie-chart
              datalabels
              :data="pieChartData"
              :options="pieChartOptions"
              :width="auto"
              :height="300"
            />
          </mdb-container>	  	
        </div>
      </div>
  
      <!-- Tabla resumen -->
       <div class="row">
        <h2>Resumen Salas </h2>
      <table>
        <tr>
          <th>Fecha</th>
          <th>Cantidad Alertas Sala 1</th>
          <th>Cantidad Alertas Sala 2</th>
          <th>Total Alertas</th>
        </tr>
        <tr v-for="register in data_jardin">
          <td v-for="valor in register">{{valor}}</td>
        </tr>
      </table>
      </div>
      <!-- Graficos tiempo real -->
      <h2>Gráfico tiempo real </h2>
      <div class="row title">
        <button class="button_sale" v-on:click="button_activate_sala1()">Sala1</button>	  
      </div>
      <div  v-if='sala1'>
      <div class="row grafic">
         
      </div>
    </div>
      <div class="row title">
        <button class="button_sale" v-on:click="button_activate_sala2()">Sala2</button>
      </div>
      <div  v-if='sala2'>
        <div class="row grafic">

          
        </div>
      </div>
      <div class="md-layout">
      
        
        <canvas id="myChart" style="width:auto; height:200px" ></canvas>
      </div>
      <div class="md-layout">
      
		        <canvas id="myChart2" style="width:auto; height:200px" ></canvas>
      
      </div>
    
    </div>
    
    
  </div>
</template>

<script>
 import { mdbLineChart, mdbContainer,  mdbPieChart, } from "mdbvue";
import Notifications from "@/components/NotificationPlugin";
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";
export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable,
    mdbLineChart,
    mdbContainer,
    mdbPieChart,
  },
  data() {
    return {
    
      PromedioMensualChart: {
			data: {
				labels: [
					"E", "Fe", "Mar",  "Ab", "M",  "Ju",  "Jul",   "Ago", "Sep", "Oct", "Nov", "Dic"
				],
				series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
							[54, 44, 620, 80, 53, 553, 526, 734, 968, 110, 256, 395]]
			},
		   options: {
				axisX: {
					showGrid: false
				},
				low: 0,
				high: 1000,
				chartPadding: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				},
				seriesBarDistance: 10
		  
			},
		
		responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]

	  },
	  TortaChart:{
		  data:{
			  series: [5, 3]
		  },
		  options:{}

	  },
      labels: ["A", "B", "C"],
      chart_data:{
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 100]
          ]
      },
      chart_options:{
        low: 0,
        high: 100, 
      },
      chart:null,

      data_jardin: [
            ['Abril',12,16,21],
            ['Marzo', 20, 15, 35],
            ['Febrero', 30 ,24, 54],
            ['Enero', 15, 11, 36],	
        ],
  
          sala1:false,
          Sala2:false,
  
          pieChartData: {
            labels: ["Sala 1", "Sala 2",],
            datasets: [
              {
                data: [0, 0],
                backgroundColor: [
                  "#F7464A",
                  "#46BFBD",
                ],
                hoverBackgroundColor: [
                  "#FF5A5E",
                  "#5AD3D1",
                ]
              }
            ]
          },
          pieChartOptions: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                color: "white",
                align: "center",
                font: {
                  size: 16
                },
                formatter: value => {
                  const [dataset] = this.pieChartData.datasets;
                  const setValue = dataset.data.reduce((a, b) => a + b);
                  return `${Math.round((value / setValue) * 100)}%`;
                }
              }
            }
         },
          lineChartData: {
            labels: [
            ],
            datasets: [
              {
                label: "Sala 1",
                backgroundColor: "rgba(255, 99, 132, 0.1)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 0.7,
                data: [0, 0, 0]
              },
              {
                label: "Sala2",
                backgroundColor: "rgba(151,187,205,0.2)",
                borderColor: "rgba(151,187,205,1)",
                borderWidth: 0.8,
                data: [0, 0, 0]
              }
            ]
          },
          lineChartOptions: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                  }
                }
              ]
            }
          }
        

    };
  },
  mounted(){

  this.button_activate_sala1();

	var data = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	series: [
		[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
		[3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
	]
	};

	var options = {
	seriesBarDistance: 10
	};

	var responsiveOptions = [
	['screen and (max-width: 640px)', {
		seriesBarDistance: 5,
		axisX: {
		labelInterpolationFnc: function (value) {
			return value[0];
		}
		}
	}]
	];

	var ctx = document.getElementById('myChart');
	 var ctx2 = document.getElementById('myChart2');
    window.chart = new Chart(ctx, {
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
	 window.chart2 = new Chart(ctx2, {
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
  },
   methods: {
      // npm install --save mdbvue 
      // npm audit fix
        button_activate_sala1: function () {
          if(this.sala1){
            this.sala1=false;
          }
          else{
              this.sala1=true;
              this.sala2=false;
          }
        },
        button_activate_sala2: function () {
          console.log(this.sala2);
          if(this.sala2){
            this.sala2=false;
          }
          else{
              this.sala2=true;
              this.sala1=false;
           }
        },
        download_csv:  function() { 
              var data = this.data_jardin;
              var csv = 'Fecha,Cantidad_Alertas_Sala_1,Cantidad_Alertas_Sala_2,Total_alertas \n';
          data.forEach(function(row) {
                  csv += row.join(',');
                  csv += "\n";
          });
       
          console.log(csv);
          var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'Resumen_alertas.csv';
          hiddenElement.click();
        },
      },
      created() {
          var data_sala1=[];
          var data_sala2=[];
          var cont_sala1 = 0;
          var cont_sala2 = 0;
          var data_label = [];
          for(var register in this.data_jardin){
            data_sala1.push(this.data_jardin[register][1]);
            data_sala2.push(this.data_jardin[register][2]);
            cont_sala1 = cont_sala1 + this.data_jardin[register][1];
            cont_sala2 = cont_sala2 + this.data_jardin[register][2];
            data_label.push(this.data_jardin[register][0]);
          }
          this.pieChartData['datasets'][0]['data']=[cont_sala1,cont_sala2];
          this.lineChartData['datasets'][0]['data']=data_sala1.reverse();
          this.lineChartData['datasets'][1]['data']=data_sala2.reverse();
          this.lineChartData['labels']=data_label.reverse();
          console.log(this.lineChartData['labels'])
      },


};
</script>

 <style type="text/css">
    .title{
      height: 30px;
    }
    .image_grafic{
      width:300px; 
      height:300px
    }
    .button_sale{
      background-color: rgba(27, 27, 27, 0.87);
      border: none;
      color: white;
      height: 30px;
      width: 100%;
      text-align: center;
      text-decoration: none;
        font-size: 16px;
        cursor: pointer;
    }
    .button_download{
        background-color: rgba(27, 27, 27, 0.87);
      border: none;
      color: white;
      height: 30px;
      width: 150px;
      text-align: center;
      text-decoration: none;
        font-size: 16px;
        cursor: pointer;
    }
      .button_download:hover{
        background-color: #ff9800;
      border: none;
      color: white;
      height: 30px;
      width: 150px;
      text-align: center;
      text-decoration: none;
        font-size: 16px;
        cursor: pointer;
    }
    .button_sale:hover {
      background-color: #ff9800;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
        font-size: 16px;
        cursor: pointer;		
    }
    .grafic{
      text-align: center;
        margin-top: 20px;
    }
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
  
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
  
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    .viewport_ {
      width: 40%;
      max-width: 100%;
      display: inline-block;
      vertical-align: top;
      overflow: auto;
      margin: 5%;
      }
  
  </style>
