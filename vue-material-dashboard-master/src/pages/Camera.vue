<template>
  <div class="content">
    <div class="row">

      <div class="column_salas viewport">

        <md-toolbar class="md-primary">
          <span class="md-title" >Salas</span>
        </md-toolbar>

        <md-content >
          <md-checkbox v-model="camara1" value="image1">Sala 1</md-checkbox>
        </md-content>
        
        <md-content>
          <md-checkbox v-model="camara2" value="image2">Sala 2</md-checkbox>
        </md-content>
        
      </div>

      <!-- div de la camara 1 y 2 -->
      <div v-if="camara1==img1 & camara2==img2" class="column_camaras viewport2" style="margin-left: 10px">
        <div class="viewport3">
          <md-toolbar class="md-primary">
            <span class="md-title">Sala 1</span>
          </md-toolbar>
          <div class="md-images" style="background-color: white">
            <img id='image1' :border="5" style="width:100%;height:100%;">
          </div>
        </div>

        <div class="viewport3 " style="margin-left: 8px">
          <md-toolbar class="md-primary">
            <span class="md-title">Sala 2</span>
          </md-toolbar>
          <div class="md-images" style="background-color: white">
            <img id='image2' :border="5" style="width:100%;height:100%;">
          </div>
        </div>
      </div>

      
      <!-- div de la camara 1 -->
      <div v-else-if="camara1==img1" class="column_camaras viewport-force" style="margin-left: 50px">
        <md-toolbar class="md-primary">
          <span class="md-title">Sala 1</span> 
        </md-toolbar>
        <div class="md-images" style="background-color: white">
          <img id='image1' :border="5">
        </div>
      </div>

      <!-- div de la camara 1 -->
      <div v-else-if="camara2==img2" class="column_camaras viewport-force" style="margin-left: 50px">
        <md-toolbar class="md-primary">
          <span class="md-title">Sala 2</span> 
        </md-toolbar>
        <div class="md-images" style="background-color: white">
          <img id='image2' :border="5">
        </div>
      </div>


    </div>




    
  </div>
</template>

<script>
const socket = io.connect('http://10.6.40.234:4000');
socket.on('image1', (image) => {
const imageElm = document.getElementById('image1');
imageElm.src = `data:image/jpeg;base64,${image}`;
});



const socket2 = io.connect('http://10.6.40.234:4010');
socket2.on('image2', (image) => {
const imageElm2 = document.getElementById('image2');
imageElm2.src = `data:image/jpeg;base64,${image}`;
});
export default {
	data() {
    	return {
    		sala1:false,
        Sala2:false,
        camara1: '',
        camara2: '',
        img1: 'image1',
        img2: 'image2',
        activate: 'false',
    	};
    },
	methods: {
    },
};
</script>


<style type="text/css">
  .md-checkbox {
    display: flex;
  }

  .body_complete {
    height: 100%;
  }

  .column_salas {
    width: 20%;
    height: 100%;
  }

  .column_camaras {
    width: 80%;
    height: 100%;
  }

  .md-toolbar {
    width: 100%;
    height: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .md-content {
    width: 100%;
    height: 40%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(#000, .12);
  }

  .md-images-toolbar {
    width: 100%;
    height: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .md-images {
    width: 100%;
    height: 80%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .viewport {
    width: 12%;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
  }

  .viewport2 {
    width: 75%;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
  }

  .viewport-force {
    width: 720px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
  }

  .viewport3 {
    width: 48%;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
  }
</style>