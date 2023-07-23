const cors = require('cors')
const express = require('express');

function init(app) {
    app.use(express.json());
    app.use(cors())
}

module.exports = init;