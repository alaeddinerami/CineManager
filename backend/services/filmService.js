const Film = require('../models/Film');

class FilmService {
    async createFilm(data) {
        try {
            const film = new Film(data);
            return await film.save();
        } catch (error) {
            throw new Error(`Error creating film: ${error.message}`);
        }
    }

    async getFilmById(id) {
        try {
            return await Film.findById(id).populate('ratings comments favorites relatedFilms');
        } catch (error) {
            throw new Error(`Film not found: ${error.message}`);
        }
    }

    async getAllFilms(filter = {}) {
        try {
            const query = filter.genre ? { genre: filter.genre } : {};
            return await Film.find(query).populate('ratings comments favorites relatedFilms');
        } catch (error) {
            throw new Error(`Error fetching films: ${error.message}`);
        }
    }

    async updateFilm(id, data) {
        try {
            return await Film.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error(`Error updating film: ${error.message}`);
        }
    }

    async deleteFilm(id) {
        try {
            return await Film.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting film: ${error.message}`);
        }
    }

    async getRelatedFilms(genre) {
        try {
            return await Film.find({ genre }).limit(5); 
        } catch (error) {
            throw new Error(`Error fetching related films: ${error.message}`);
        }
    }
}

module.exports = new FilmService();
