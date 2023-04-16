const db = require("../models");
const OrderDetail = db.orderDetail;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
    const  data = req.body;
  // Create a order
  const orderDetail = {
    order_id: data.order_id,
    product_id: data.product_id, 
    quantity: data.quantity
  };

  // Save Order in the database
  OrderDetail.create(orderDetail)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OrderDetail."
      });
    });
};

// Retrieve all OrderDetail from the database.
exports.findAll = (req, res) => {
OrderDetail.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrderDetail."
      });
    });
};

// Find a single OrderDetail with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OrderDetail.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find OrderDetail with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving OrderDetail with id=" + id
      });
    });
};

// Update a OrderDetail by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  OrderDetail.update(req.body, {
    where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update OrderDetail with id=${id}. Maybe OrderDetail was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error updating OrderDetail with id=" + id
      });
    });
};

// Delete a OrderDetail with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OrderDetail.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OrderDetail was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete OrderDetail with id=${id}. Maybe OrderDetail was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete OrderDetail with id=" + id
      });
    });
};

// Delete all OrderDetail from the database.
exports.deleteAll = (req, res) => {
    OrderDetail.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} OrderDetail were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all OrderDetail."
      });
    });
};

// find all published OrderDetail
exports.findAllPublished = (req, res) => {
    OrderDetail.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OrderDetail."
      });
    });
};