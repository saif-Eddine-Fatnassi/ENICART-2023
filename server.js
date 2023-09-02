const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 8080; // Utilisez le port défini dans l'environnement (utile pour le déploiement) ou 5000 par défaut.
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', async function (req, res) {
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic aW5mcmFAYmlhbC14LmNvbTpUaWMmVGFjNjk=");
myHeaders.append("Cookie", "JSESSIONID=73djxdztQXBV-HPov+GTVZoz; f_lb_t=https://10.0.6.68:2443");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const data = await fetch("https://bialx.fitnetmanager.com/FitnetManager/rest/contracts/read/1", requestOptions)
  .then(response => response.text())
  .catch(error => console.log('error', error));
 return res.send(data);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
