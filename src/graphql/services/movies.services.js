const MoviesModel = require('../models/movies.modelgql');

async function getMovies({ limit = 50, page = 0 } = {}) {
  let skip;
  if (page !== 0) {
    skip = page * limit;
  }

  const res = await MoviesModel.find()
    .sort({ _id: 1 })
    .skip(+skip)
    .limit(+limit);

  return res;
}

function getMovieById(id) {
  return MoviesModel.findById(id);
}

function getAllMoviesInReceivedIdList(listOfMovieId) {
  return MoviesModel.find({ _id: { $in: listOfMovieId } }).sort({ _id: 1 });
}

async function isMovieInDB(idMovie) {
  const movie = await getMovieById(idMovie);
  if (movie == null) {
    throw new Error('This idMovie is not in the database!');
  }
}

module.exports = {
  getMovies,
  getMovieById,
  getAllMoviesInReceivedIdList,
  isMovieInDB
};
