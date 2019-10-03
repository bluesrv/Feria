<template>
  <div class="content">



    <img id="image">


    
  </div>
</template>

<script>

const socket = io.connect('http://10.6.43.130:4000');
socket.on('image', (image) => {
const imageElm = document.getElementById('image');
imageElm.src = `data:image/jpeg;base64,${image}`;
});
export default {};

</script>
