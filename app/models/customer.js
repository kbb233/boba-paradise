module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      customer_name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.INTEGER,
        default: 0
      },
    });
    return Customer;
  };