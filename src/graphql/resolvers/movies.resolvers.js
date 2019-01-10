const { GraphQLDateTime } = require('graphql-iso-date');
const moivesServices = require('../services/movies.services');

const moviesResolvers = {
  Query: {
    movies: (parent, args, context) => moivesServices.getMovies({ limit: args.nbMoviesPerPage, page: args.page }),

    movie: (parent, args, context) => moivesServices.getMovieById(args.userId)
  },

  Date: GraphQLDateTime
};
module.exports = moviesResolvers;
