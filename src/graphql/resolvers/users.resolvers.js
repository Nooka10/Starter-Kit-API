const { isAuthenticatedAndIsYourself } = require('./authorization.resolvers');
const usersServices = require('../services/users.services');
const moviesServices = require('../services/movies.services');

const usersResolvers = {
  Query: {
    users: (parent, args, context) => usersServices.getUsers(),

    user: (parent, args, context) => usersServices.getUserById(args.userId),

    me: (parent, args, context) => usersServices.getUserByToken(args.token),

    checkIfEmailIsAvailable: (parent, args, context) => usersServices.isEmailAvailable(args.email)
  },

  Mutation: {
    updateUser: async(parent, args, context) => {
      await isAuthenticatedAndIsYourself(context.id, args.user.id);
      return usersServices.updateUser(args.user);
    },

    addMovieToWatchList: async(parent, args, context) => {
      await isAuthenticatedAndIsYourself(context.id, args.userId);
      return usersServices.addFilmToWatchListOfUser(args.userId, args.movieId);
    },

    removeMovieToWatchList: async(parent, args, context) => {
      await isAuthenticatedAndIsYourself(context.id, args.userId);
      return usersServices.removeFilmToWatchListOfUser(args.userId, args.movieId);
    },

    deleteUser: async(parent, args, context) => {
      await isAuthenticatedAndIsYourself(context.id, args.userId);
      return usersServices.deleteUser(args.userId);
    }
  },

  User: {
    watchList: (parent, args, context) => moviesServices.getAllMoviesInReceivedIdList(parent.watchList)
  }
};
module.exports = usersResolvers;
