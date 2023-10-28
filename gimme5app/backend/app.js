const express = require('express');
const app = express();
const port = 8080;


app.get('/', (req, res) => {
    res.send('Huhu! app.js is here')
  })
  
  app.listen(port, () => {
    console.log(`app.js here - Example app listening on port ${port}`)
  })
  