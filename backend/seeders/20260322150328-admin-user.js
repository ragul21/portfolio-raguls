"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "ragul@admin.com",
        password:
          "$2b$10$/fSoHnn8kdyae6PNkfgK9eF.oZOTV7RTAHW7pKSiXTC6lzY0R.Oua",
        role: "admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // delete your admin user here

    await queryInterface.bulkDelete("users", null, {});
  },
};
