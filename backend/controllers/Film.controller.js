const filmService = require('../services/filmService');
const { createFilmValidation, updateFilmValidation } = require('../helpers/validation_schema');
const upload = require('../middlewares/upload'); 
const path = require('path');
const fs = require('fs');

class FilmController {
  async getAll(req, res) {
    try {
      const films = await filmService.getAllFilms();

      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
      const filmsWithImages = films.map(film => ({
        ...film._doc,
        image: `${baseUrl}${film.image}`
      }));

      res.status(200).json(filmsWithImages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFilmById(req, res) {
    try {
      const filmId = req.params.id;
      const film = await filmService.getFilmById(filmId);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
      film.image = `${baseUrl}${film.image}`;

      res.status(200).json(film);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFilmByIdWithSeance(req, res) {
    try {
      const filmId = req.params.id;
      const { film, seances } = await filmService.getFilmByIdWithSeances(filmId);

      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
      film.image = `${baseUrl}${film.image}`;

      res.status(200).json({ film, seances });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      try {
        const { title, genre, description, duration } = req.body;
        await createFilmValidation.validateAsync(req.body);

        const image = req.file ? req.file.filename : 'default_image.jpg';
        const filmData = { title, genre, description, duration, image };

        const film = await filmService.createFilm(filmData);
        res.status(201).json({ message: "Film created successfully", film });
      } catch (error) {
        if (error.isJoi) {
          return res.status(422).json({ message: "Validation error", details: error.details[0].message });
        }
        res.status(500).json({ message: error.message });
      }
    });
  }

  async update(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      try {
        const filmId = req.params.id;
        const { title, genre, description, duration } = req.body;

        await updateFilmValidation.validateAsync(req.body);

        const updatedData = {
          title,
          genre,
          description,
          duration,
          image: req.file ? req.file.filename : undefined
        };

        if (req.file) {
          const film = await filmService.getFilmById(filmId);
          if (film && film.image !== 'default_image.jpg') {
            fs.unlinkSync(path.join(__dirname, '../uploads/', film.image));
          }
        }

        const updatedFilm = await filmService.updateFilm(filmId, updatedData);
        res.status(200).json({ message: "Film updated successfully", updatedFilm });
      } catch (error) {
        if (error.isJoi) {
          return res.status(422).json({ message: "Validation error", details: error.details[0].message });
        }
        res.status(500).json({ message: error.message });
      }
    });
  }

  async delete(req, res) {
    try {
      const filmId = req.params.id;
      const film = await filmService.deleteFilm(filmId);
      if (film.image !== 'default_image.jpg') {
        fs.unlinkSync(path.join(__dirname, '../uploads/', film.image));
      }

      res.status(200).json({ message: "Film deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new FilmController();
