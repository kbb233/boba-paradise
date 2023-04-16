module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      order_date: {
        type: Sequelize.STRING
      },

      customer_comments: {
        type: Sequelize.STRING
      },

      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      phone_number: {
        type: Sequelize.STRING,
        foreignKey: true,
      },
      
    });
    return Order;
  };
