<template>
  <form @submit.prevent="submit">
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Registrar nuevo Usuario</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nombre de Usuario</label>
              <md-input v-model="user.username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="user.email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="user.first_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Contraseña</label>
              <md-input v-model="user.password" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="user.last_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">

          <div class="md-layout-item md-size-100 text-right">
            <md-button type= "submit" class="md-raised md-success" >Registrar Usuario</md-button>
          </div>
          </div>
        </div>

      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "orange"
    }
  },
  data() {
    return {
      username: null,
      disabled: null,
      email: null,
      last_name: null,
      first_name: null,
      address: null,
      user:{},
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
    };
  

  },
  methods: {
    register: function ( inp) {
      console.log(inp);
    },

    submit: function (){
      console.log(this.user);
      this.$axios.post('http://127.0.0.1:8000/api/users/', this.user).then(response => {
        alert('Usuario Agregado');
        window.location.href = 'http://localhost:8080/#/users';
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors || {};
          
        }
        alert('Faltan campos por completar');
        });
    }
  }

};
</script>
<style></style>