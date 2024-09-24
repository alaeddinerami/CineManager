const Film = require("../models/Film"); // Adjust the path to your Film model
const { createFilmValidation, updateFilmValidation } = require("../helpers/validation_schema");

class FilmController {
  async getAll(req, res) {
    try {
      const films = await Film.find();
      res.status(200).json(films);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFilmById(req, res) {
    try {
      const filmId = req.params.id;
      const film = await Film.findById(filmId);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }
      res.status(200).json(film);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { title, genre, description, image } = req.body;
      const reqValidation = await createFilmValidation.validateAsync(req.body);
      console.log(reqValidation);

      const existingFilm = await Film.findOne({ title });
      if (existingFilm) {
        return res.status(400).json({ message: "Film already exists" });
      }

      const film = new Film({
        title,
        genre,
        description,
        image,
      });

      await film.save();
      res.status(201).json({ message: "Film created successfully", film });
    } catch (error) {
      if (error.isJoi) {
        return res.status(422).json({ message: "Validation error", details: error.details[0].message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const filmId = req.params.id;
      const { title, genre, description, image } = req.body;

      let film = await Film.findById(filmId);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }

      const reqValidation = await updateFilmValidation.validateAsync(req.body);
      console.log(reqValidation);

      const updatedData = {
        title: title || film.title,
        genre: genre || film.genre,
        description: description || film.description,
        image: image || film.image,
      };

      film = await Film.findByIdAndUpdate(filmId, updatedData, { new: true });

      res.status(200).json({ message: "Film updated successfully", film });
    } catch (error) {
      if (error.isJoi) {
        return res.status(422).json({ message: "Validation error", details: error.details[0].message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const filmId = req.params.id;

      const film = await Film.findById(filmId);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }

      await Film.findByIdAndDelete(filmId);

      res.status(200).json({ message: "Film deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new FilmController();
