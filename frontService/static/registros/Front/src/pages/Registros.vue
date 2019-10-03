<template>
  <div class="content">
    <div class="cuadrado">

      <h3> Video 5 </h3> <h5>Fecha: 6 </h5> <h5>Nivel: 7</h5>
      <video controls width="320" height="208">
        <source src='./../../../data/1.mp4' type="video/mp4">
          Tu navegador no implementa el elemento <code>video</code>.
      </video>
      <h3> ¿Es una situacion de violencia?</h3>
      <button input name="1" id='1' v-on:click="desactivar(1,'1,2')">Sí lo es</button>
      <button input name="2" id='2' v-on:click="alarma(1); desactivar(2,'1,2')">No lo es</button>
    </div>
  </div>
</template>

<script>
  var ws = new WebSocket("ws://localhost:34567/")
  export default{

    methods: {
      alarma: function(message) {
          console.log(message);
          ws.onopen = () => ws.send(message)
      },
      desactivar: function(name,nombreBotones){
        var partesBotones = nombreBotones.split(",");
        var i;
        for(i=0;i<partesBotones.length;i++){
            var boton = document.getElementById(partesBotones[i]);
            boton.disabled = true;
        }


      }


    }
  };
</script>
<style lang="scss" scoped>
.cuadrado{
    width: 400px;
    height: 400px;
    padding:5px;
margin:10px;
background-color: #E5AC75;
border: solid 1px red;
color: white;
align-items: center;
justify-content: center;
};

</style>
