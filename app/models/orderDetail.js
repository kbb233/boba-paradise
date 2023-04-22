module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define("OrderDetail", {
        order_id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },

      product_id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
    });
    return OrderDetail;
  };

