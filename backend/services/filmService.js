const Film = require('../models/film');
const Seance = require('../models/seance.model');

const filmService = {
  getAllFilms: async () => {
    return await Film.find();
  },

  getFilmById: async (filmId) => {
    return await Film.findById(filmId);
  },

  getFilmByIdWithSeances: async (filmId) => {
    const film = await Film.findById(filmId);
    if (!film) {
      throw new Error('Film not found');
    }

    const seances = await Seance.find({ film: filmId }).populate('salle');
    if (!seances || seances.length === 0) {
      throw new Error('No seances found for this film');
    }

    return { film, seances };
  },

  createFilm: async (filmData) => {
    const existingFilm = await Film.findOne({ title: filmData.title });
    if (existingFilm) {
      throw new Error('Film already exists');
    }

    const film = new Film(filmData);
    await film.save();
    return film;
  },

  updateFilm: async (filmId, updatedData) => {
    return await Film.findByIdAndUpdate(filmId, updatedData, { new: true });
  },

  deleteFilm: async (filmId) => {
    const film = await Film.findById(filmId);
    if (!film) {
      throw new Error('Film not found');
    }

    await Film.findByIdAndDelete(filmId);
    return film;
  }
};

module.exports = filmService;
