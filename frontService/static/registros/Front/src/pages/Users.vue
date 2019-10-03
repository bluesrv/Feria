<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Lista de Apoderados</h4>
            <md-button to="/registration"  class="md-primary">
                <md-icon> person_add</md-icon>
                Agregar Usuario
            </md-button>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="users" :table-header-color="tableHeaderColor">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="id">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Nombre">{{ item.username }}</md-table-cell>
                  <md-table-cell md-label="Mail">{{ item.email }}</md-table-cell>
                  <md-table-cell md-label="edit">
                    <md-button  class="md-just-icon md-simple md-primary">
                      <md-icon>edit</md-icon>
                    </md-button>
                  </md-table-cell>
                  <md-table-cell md-label="destroy">
                    <md-button v-on:click="borrar(item.id)" class="md-just-icon md-simple md-danger ">
                      <md-icon>delete</md-icon>
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

<script>
var websocket = new WebSocket("ws://localhost:3000/");
websocket.onopen = function(evt) { onOpen(evt) };
function onOpen(evt) {
  console.log('se conectooo');
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
      users: [],
      loading:true,
      erroed:false
    };
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/users/',  {
        headers: {
          'Access-Control-Allow-Origin': '*',
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
                'Access-Control-Allow-Origin': '*',
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
    }
  }
};
</script>