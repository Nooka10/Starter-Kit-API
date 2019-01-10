const clearDB = require('./graphql/clearDB');
const usersServices = require('../src/graphql/services/users.services');

let tabUsers;

const populateDB = async() => {
  await clearDB();

  // ------------------------------------------------------------------- ajout de 2 users ----------------------------------------------------------------------
  const user1 = await usersServices.addUser(
    {
      firstname: 'Benoît',
      lastname: 'Schöpfli',
      email: 'benoit@schopfli.ch',
      password: '1234abcd'
    }
  );

  const user2 = await usersServices.addUser(
    {
      firstname: 'Antoine',
      lastname: 'Rochaille',
      email: 'antoine@rochaille.ch',
      password: '1234abcd'
    }
  );

  const user3 = await usersServices.addUser(
    {
      firstname: 'Paul',
      lastname: 'Ntawuruquelquechosedugenre',
      email: 'paul@nta.ch',
      password: '1234abcd'
    }
  );

  const user4 = await usersServices.addUser(
    {
      firstname: 'Miguel',
      lastname: 'SantaClause',
      email: 'miguel@santaclause.ch',
      password: '1234abcd'
    }
  );


  // ------------------------------------------------------------------------- tableaux ------------------------------------------------------------------------
  // on regroupe chaque élément dans des tableaux pour les tests d'intégration
  tabUsers = [user1, user2, user3, user4];
};

it('should populate the database!', populateDB);

module.exports = {
  populateDB,
  getTabUsers: () => tabUsers,
};
