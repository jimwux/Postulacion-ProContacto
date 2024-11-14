const https = require('https');
const url = 'https://reclutamiento-dev-procontacto-default-rtdb.firebaseio.com/reclutier.json';

https.get(url, (response) => {
  let datosRespuesta = ''; 

  response.on('data', (chunk) => { 
    datosRespuesta += chunk;  // Cada vez que llega un pedazo de datos, lo concatenamos a la variable
  });

  response.on('end', () => {
    console.log(JSON.parse(datosRespuesta));
  });

})