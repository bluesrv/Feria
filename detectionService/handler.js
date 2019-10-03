const buildHandlerPrediction = (pubsub) => {
  return (array) => {
    let retAmm = 0;
    const countPersons = element => {
      if(element.class === 'person') retAmm += 1;
    }
    array.forEach(countPersons);
    pubsub.emit('detection', retAmm);
    return retAmm;
  }
}

module.exports = buildHandlerPrediction;