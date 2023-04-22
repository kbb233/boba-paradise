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
db.order.belongsTo(db.customer); 

db.order.hasMany(db.orderDetail);
db.orderDetail.belongsTo(db.order);

// db.orderDetail.hasOne(db.product);
// db.product.belongsToMany(db.orderDetail, {through: 'orderDetail', targetKey: 'product_id'});


module.exports = db;