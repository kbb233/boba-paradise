const dbConfig = require("../../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize
};

db.product = require("./product.js")(sequelize, Sequelize);
db.customer = require("./customer.js")(sequelize, Sequelize);
db.order = require("./order.js")(sequelize, Sequelize);
db.orderDetail = require("./orderDetail.js")(sequelize, Sequelize);


db.customer.hasMany(db.order)
db.order.belongsTo(db.customer, {
  foreignKey: 'phone_number'
}); 

db.order.hasMany(db.orderDetail);
db.orderDetail.belongsTo(db.order, {
  foreignKey: 'id',
  target: 'order_id'
});

module.exports = db;