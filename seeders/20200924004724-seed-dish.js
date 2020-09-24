'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Dishes', [
     {
       title: 'Jollof Rice',
       description: 'Favorite dish loved by a vast majority of nigerians, and can also serve as a staple party dish',
       price: 1000.00,
       createdAt: new Date().toDateString(),
       updatedAt: new Date().toDateString()
     },
     {
       title: 'Fried Rice',
       description: 'Most people seem to like this high level food. Its speaks to a high taste level bud',
       price: 1500.00,
       createdAt: new Date().toDateString(),
       updatedAt: new Date().toDateString()
     }
   ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Dishes', null, {});
  }
};
