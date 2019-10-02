const buildHandlerPrediction = (connection) => {
  return (array) => {
    let retAmm = 0;
    const countPersons = element => {
      if(element.class === 'person') retAmm += 1;
    }
    array.forEach(countPersons);
    connection.send(retAmm);
    return retAmm;
  }
}

module.exports = buildHandlerPrediction;