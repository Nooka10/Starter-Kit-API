const mongoose = require('mongoose');
const moviesServices = require('../services/movies.services');
/**
 * User Schema
 */
const options = {
  toObject: { virtuals: true }
};

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    lastname: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      lowercase: true
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    watchList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true
      }
    ]
  }, options
);

userSchema.pre('findOneAndUpdate', async function(next) {
  try {
    if (this._update != null && this._update.$addToSet != null) {
      const addToSetOperation = this._update.$addToSet;
      try {
        // throw si l'id ajouté dans la watchList ne correspond à aucun film de la DB
        await moviesServices.isMovieInDB(addToSetOperation.watchList);
      } catch (err) {
        throw new Error(`You try to add a unknown movie (with id: ${addToSetOperation.watchList}) to a user watchList!`);
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

const UsersModel = mongoose.model('users', userSchema);

/**
 * @typedef Person
 */
module.exports = UsersModel;
