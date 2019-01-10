const mongoose = require('mongoose');

/**
 * Movies Schema
 */
const options = {
  toObject: { virtuals: true }
};

const moviesSchema = new mongoose.Schema(
  {
    vote_count: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    video: {
      type: mongoose.Schema.Types.Boolean,
      required: true
    },
    vote_average: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    title: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    popularity: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    poster_path: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    original_language: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    original_title: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    backdrop_path: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    adult: {
      type: mongoose.Schema.Types.Boolean,
      required: true
    },
    overview: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    release_date: {
      type: mongoose.Schema.Types.Date,
      required: true
    },
    tmdb_id: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    genres: {
      type: [mongoose.Schema.Types.Number],
      required: true
    }
  }, options
);

const MoviesModel = mongoose.model('movies', moviesSchema);

/**
 * @typedef Person
 */
module.exports = MoviesModel;
