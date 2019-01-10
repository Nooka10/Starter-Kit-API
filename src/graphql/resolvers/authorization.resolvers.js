const { ForbiddenError } = require('apollo-server-express');

const checkIfIsAuthenticated = idInContext => (idInContext ? true : new ForbiddenError('Sorry, you need to be authenticated to do that.'));

const checkIfIsYourself = (idInContext, idInArgs) => (idInArgs === idInContext ? true : new ForbiddenError(
  'You can\'t modify information of another user than yourself!'
));

const isAuthenticatedAndIsYourself = (idInContext, idInArgs) => {
  const resultAuthenticated = checkIfIsAuthenticated(idInContext);
  const resultYourself = checkIfIsYourself(idInContext, idInArgs);
  if (resultAuthenticated.message != null) {
    throw resultAuthenticated;
  }
  if (resultYourself.message != null) {
    throw resultYourself;
  }
  return true;
};

module.exports = {
  isAuthenticatedAndIsYourself
};
