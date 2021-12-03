'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Niveis', [
      {
				desc_nivel: 'básico',
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				desc_nivel: 'intermediário',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				desc_nivel: 'avançado',
				createdAt: new Date(),
				updatedAt: new Date()
			} 
     ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
