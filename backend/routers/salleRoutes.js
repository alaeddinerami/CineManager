const express = require('express')
const router = express.Router()
const salleController = require('../controllers/Salle.controller')

router.get('/salles', salleController.getAll);
router.get('/salles/:id',salleController.getSalleById)
router.post('/salles',salleController.create);
router.put('/salles/:id', salleController.update);
router.delete('/salles/:id', salleController.delete);


module.exports = router;