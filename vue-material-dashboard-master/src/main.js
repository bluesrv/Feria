// =========================================================
// * Vue Material Dashboard - v1.2.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import Vuex from 'vuex';

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import axios from "axios";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;
Vue.prototype.$axios = axios;
Vue.prototype.$chart=null;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(Vuex);

window.notif=0;
/*
var ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
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
});*/

const store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist,
    axios: axios,
    superlevel:0,
    myChart:null,

  },
  methods:{
    connect: function(){
        this.socket = new WebSocket("ws://localhost:8999");
        this.socket.onopen = this.onOpen();
      },
    disconnect: function(){
        this.socket.close();
        this.status = "disconnected";
        this.logs = [];
    },
    onOpen: function(){
      this.status = "connected";
      console.log("connected");
      this.socket.onmessage = this.onMsg;
    },
    sendMessage: function(msg){
      this.socket.send(this.message);
      this.logs.push({ event: "Sent message", data: this.message });
      this.message = "";
    },
    onMsg: function(evt){
      var data=JSON.parse(evt.data);
      if(data.alarm==1){
        console.log("ararmaaa");
        this.$notify({
            message: '¡Alerta! Sala' + data.sala,
          icon: 'add_alert',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
        var x = document.getElementsByClassName("notification");
        x.innerHTML= window.notif;
        window.notif=window.notif+1;

      }
      var tiempo=new Date();
      var hora= tiempo.getHours()+':'+tiempo.getMinutes()+':'+tiempo.getSeconds();
      console.log(data);
      var level= data.nivel;
      if(data.sala=='1'){
        this.addData(window.chart,hora,parseFloat(level) );
      }
      else{
        this.addData(window.chart2,hora, parseFloat(level));

      }
      
      
    },
    addData: function(chart, label, data) {
        console.log(chart);
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
    },
    removeData: function(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
        }
  },
  mounted(){
    this.connect();
    console.log("main");
  }


});
