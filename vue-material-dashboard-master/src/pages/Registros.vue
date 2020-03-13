<template>
  <div class="content">
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="¿Esta seguro que quiere eleiminar este registro?"
      md-content="El registro de la posible agresion será eliminado para siempre y es posible que actos de este tipo ya no se consideren agresion"
      md-confirm-text="Sí"
      md-cancel-text="Cancelar" 
      @md-cancel="active = false"
      @md-confirm="deleteLog(selectedId.id)"
      />
    <md-dialog :md-active.sync="showDialog" v-on:md-opened="showVideo()">
      <md-dialog-content>
        <md-dialog-title>Detalles</md-dialog-title>
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-large-size-66 md-medium-size-66 md-small-size-100 md-xsmall-size-100">
                  <video   ref="videoPlayer"  class="video-js vjs-default-skin vjs-16-9">
                  
                  </video>

          </div> 
          <div class="md-layout-item md-large-size-33 md-medium-size-33 md-small-size-100 md-xsmall-size-100">
              <md-list>
                <md-list-item>
                  <md-icon>video_library</md-icon>
                  <p class="md-list-item-text">Id:{{selectedId.id}}</p>
                </md-list-item>
                <md-list-item>
                  <md-icon>show_chart</md-icon>
                  <p class="md-list-item-text">Nivel: {{selectedId.level}}</p>
                </md-list-item>
                <md-list-item>
                  <md-icon>videocam</md-icon>
                  <p class="md-list-item-text">Sala: {{selectedId.room}}</p>
                </md-list-item>
              </md-list>
              <div>
                <p>¿No es violencia y debe ser eliminado?</p>
                <md-button class="md-primary" @click="showAlert">¡Eliminar!</md-button>
              </div>
          </div>
        </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Cerrar</md-button>
      </md-dialog-actions>
      </md-dialog-content>

      
    </md-dialog>

    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Registros de Alarmas</h4>        
          </md-card-header>
          <md-card-content>
             <div class="md-layout md-gutter md-alignment-center">
              <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <md-field>
                  <label for="mes">Mes</label>
                    <md-select v-model="mes" name="mes" id="mes" @input="searchOnTable">
                      <md-option>No seleccionar</md-option>
                      <md-option value="1">Enero</md-option>
                      <md-option value="2">Febrero</md-option>
                      <md-option value="3">Marzo</md-option>
                      <md-option value="4">Abril</md-option>
                      <md-option value="5">Mayo</md-option>
                      <md-option value="6">Junio</md-option>
                      <md-option value="7">Julio</md-option>
                      <md-option value="8">Agosto</md-option>
                      <md-option value="9">Septiembre</md-option>
                      <md-option value="10">Octubre</md-option>
                      <md-option value="11">Noviembre</md-option>
                      <md-option value="12">Diciembre</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <md-field>
                  <label for="anio">Año</label>
                    <md-select v-model="anio" name="anio" id="anio" @input="searchOnTable">
                      <md-option>No seleccionar</md-option>
                      <md-option value="2019">2020</md-option>
                      <md-option value="2019">2019</md-option>
                      <md-option value="2018">2018</md-option>
                      <md-option value="2017">2017</md-option>
                      <md-option value="2016">2016</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <md-field>
                  <label for="sala">Sala</label>
                    <md-select v-model="sala" name="sala" id="sala" @input="searchOnTable">
                      <md-option>No seleccionar</md-option>
                      <md-option value="1">1</md-option>
                      <md-option value="2">2</md-option>
                  </md-select>
                </md-field>
              </div>             
            </div>   
            <div>
              <md-table v-model="selected" :table-header-color="tableHeaderColor">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="id">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Sala">{{ item.room }}</md-table-cell>
                  <md-table-cell md-label="Nivel">{{ item.level }}</md-table-cell>
                  <md-table-cell md-label="Fecha">{{ new Date(item.date).getDate() }} - 0{{ new Date(item.date).getMonth() }} - {{ new Date(item.date).getFullYear() }}</md-table-cell>
                  <md-table-cell md-label="Ver Detalles">
                    <md-button v-on:click="select(item)"  class="md-simple md-primary">
                      <md-icon>find_in_page</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>


    </div>
  </div>
</template>

<style lang="scss" scoped>
  .md-dialog{
    min-width: 70%;
  }
</style>

<script>
import videojs from 'video.js';

const searchByfield = (items, anio, mes, sala) => {
    var selected=items;

    if (anio) {

      selected= selected.filter(item => new Date(item.date).getFullYear()==anio);
    }
    if (mes) {
      selected=selected.filter(item =>  new Date(item.date).getMonth()==mes);
    }
    if (sala) {
      selected=selected.filter(item => item.room==sala);
    }

    return selected
  }

export default {
  components: {
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      alerts: [],
      loading:true,
      erroed:false,
      showDialog: false,
      active:false,
      selectedId:{
        id:0,
        level:0,
        room:0
      },
      player: null,
      anio:null,
      mes:null,
      sala:null,
      route:null,
      options:{
        autoplay: true,
        sources: [],
        fluid:true
      }
    };
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/alerts/',  {
        headers: {
          'Content-Type': 'application/json',
        } })
          .then(response => {
            
            this.alerts = response.data;
            this.selected=this.alerts;
            var dat=new Date(this.alerts[0].date);
            console.log(dat.getFullYear());
          })
          .catch(error => {
            console.log(error);
            this.errored = true
          })
          .finally(() => this.loading = false);
   
  },
  methods:{
    borrar: function(id){
      console.log(id);
      this.$axios
      .delete('http://127.0.0.1:8000/api/users/'+id+'/')
          .then(response => {
          
            console.log(response);
            this.$axios
            .get('http://127.0.0.1:8000/api/users/',  {
              headers: {
                'Content-Type': 'application/json',
                'withCredentials':false
              },
              crossDomain: true })
                .then(response => {
                  
                  this.users = response.data;
                  console.log(this.users);
                })
                .catch(error => {
                  console.log(error);
                  this.errored = true
                })
                .finally(() => this.loading = false);

          })
    },
    select: function(item){
      this.showDialog= true;
      this.selectedId=item;
      console.log(item);

    },
    showVideo: function(){
      var video = this.selectedId.route;
      console.log(video);
      var videoURL="beegilant_comercial.mp4";
      var srcs=	{
						src:require("@/registros/"+video),
             
						type: "video/mp4"
					  };
      this.options.sources=[srcs];
      console.log(this.options);
      this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    searchOnTable:function () {
        console.log("searching..");
        this.selected = searchByfield(this.alerts, this.anio,this.mes,this.sala)
      },
    printSelected: function(){
      console.log(this.mes);
    },
    deleteLog: function(id){
      console.log(id);
      this.$axios
      .delete('http://127.0.0.1:8000/api/alerts/'+id+'/')
          .then(response => {
          
            console.log(response);
            this.$axios
            .get('http://127.0.0.1:8000/api/alerts/',  {
              headers: {
                'Content-Type': 'application/json',
              },
              crossDomain: true })
                .then(response => {
                  
                  this.alerts = response.data;
                  this.selected=this.alerts;
                  this.anio=null;
                  this.mes=null;
                  this.sala=null;
                })
                .catch(error => {
                  console.log(error);
                  this.errored = true
                })
                .finally(() => this.loading = false);

          })

    },
    showAlert:function(){
       this.showDialog= false;
        this.active=true;
    }
  }
};
</script>
