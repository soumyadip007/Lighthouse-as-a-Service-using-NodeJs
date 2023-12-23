const express = require('express');
const bodyParser = require('body-parser');
const lighthouseController = require('./controllers/lighthouseController');
const lhcliController = require('./controllers/lhcliController');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/lighthouse', lighthouseController.launchChromeAndRunLighthouse);
app.post('/api/lhcli', lhcliController.lhcli);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
