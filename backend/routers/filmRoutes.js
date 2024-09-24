const express = require("express");
const router = express.Router();
const FilmController = require("../controllers/Film.controller");

router.post('/films', FilmController.create);
router.get('/films', FilmController.getAll);
router.get('/films/:id', FilmController.getFilmById);
router.put('/films/:id', FilmController.update);
router.delete('/films/:id', FilmController.delete);

module.exports = router;
