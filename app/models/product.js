module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      productName: {
        type: Sequelize.STRING
      }, 
      recipe: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
  
    return Product;
  };
