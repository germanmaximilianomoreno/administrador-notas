const express = require('express');
const {getAllNotas} = require('../controllers/notas.controller')
const {getNota} = require('../controllers/notas.controller')
const {putNota} = require('../controllers/notas.controller')
const {postNota} = require('../controllers/notas.controller')
const {deleteNota} = require('../controllers/notas.controller')

const router = express.Router();

router.get("/", getAllNotas);
router.get("/:id", getNota);
router.put("/:id", putNota);
router.post("/", postNota);
router.delete("/:id", deleteNota);

module.exports = router;