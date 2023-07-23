const express = require('express');
const router = require('./routes/notas.routes')
const init = require('./middlewares/init')

const app = express();

//middleware
init(app)

//Routers
app.use("/api/notas", router);

module.exports = app;
