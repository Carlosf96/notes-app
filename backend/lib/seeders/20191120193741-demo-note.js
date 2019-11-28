'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
/*       Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkInsert('Notes', [{
        id: 'af873ha73f3qfa3fa',
        title: 'Title alert!',
        body: 'Body alert!',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /* Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete('Notes', null, {});
   
  }
};
