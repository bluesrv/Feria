const fs = require('fs');
const Canvas = require('canvas');

const buildPredictFunction = (model, handler) => {
  return async function predictFunc(n){
    const file = fs.readFileSync(`./temp${n}.png`);
    const img = new Canvas.Image();
    img.src = file;
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const prediction = await model.detect(canvas);
    console.log(handler(prediction));
    fs.unlinkSync(`./temp${n}.png`);
  }
}

module.exports = buildPredictFunction;