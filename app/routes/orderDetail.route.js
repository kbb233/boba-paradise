module.exports = app => {
    const orderDetail = require("../controllers/orderDetail.controller.js");

    var router = require("express").Router();
  
    router.post("/", orderDetail.create);
  

    router.get("/", orderDetail.findAll);
  

    router.get("/published", orderDetail.findAllPublished);
  

    router.get("/:id", orderDetail.findOne);
  

    router.put("/:id", orderDetail.update);
  

    router.delete("/:id", orderDetail.delete);
  

    router.delete("/", orderDetail.deleteAll);
  
    app.use("/api/orderDetails", router);
  };