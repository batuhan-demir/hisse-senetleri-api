const express = require('express');

const app = express();

const port = 3000;

const hisseModule = require('./module')

app.get('/', async(req, res) => {
    const { hisse } = req.query;

    const sonuc = await hisseModule(hisse);

    res.send(sonuc);
})

app.listen(port, () => console.log("Sunucu baslatildi."))