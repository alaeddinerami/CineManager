const express = require("express");
const router = express.Router();
const FilmController = require("../controllers/Film.controller");

// router.post('/', FilmController.create);
// router.get('/', FilmController.getAll);
// router.get('/:id', FilmController.getFilmById);
// router.get('/filmSeanse/:id', FilmController.getFilmByIdWithSeance);
// router.put('/:id', FilmController.update);
// router.delete('/:id', FilmController.delete);


router.post('/', FilmController.createFilm);

// Get a film by ID
router.get('/:id', FilmController.getFilmById);

// Get all  with optional filtering
router.get('/', FilmController.getAllFilms);

// Update a film
router.put('/:id', FilmController.updateFilm);

// Delete a film
router.delete('/:id', FilmController.deleteFilm);

// Get related by genre
router.get('/related', FilmController.getRelatedFilms);
module.exports = router;
