const express = require('express');
const customers = require('../customers');
const router = express.Router();

//get all customers
router.get('/', (req, res) => {
  res.json(customers);
});

//get customers by id
router.get('/:id', (req, res) => {

  const getCustomer = customers.filter(customer => customer.id === parseInt(req.params.id))

  if (getCustomer.length) {
    res.json(getCustomer);
  } else {
    return res.status(400).json({ message: `No record found with id ${req.params.id}` })
  }
});

//update customers
router.put('/:id', (req, res) => {

  const getCustomer = customers.filter(customer => customer.id === parseInt(req.params.id));

  if (getCustomer.length) {
    customer = [{
      id: getCustomer[0].id,
      name: req.body.name ? req.body.name : getCustomer[0].name,
      age: req.body.age ? req.body.age : getCustomer[0].age,
      phone: req.body.phone ? req.body.phone : getCustomer[0].phone,
      order_item: getCustomer[0].order_item

    }
    ]

    res.json({
      message: "customer updated",
      customer,
    })

  } else {
    return res.status(400).json({ message: `Sorry no user found with id ${req.params.id}` })
  }
});

//delete customer

router.delete('/:id', (req, res) => {

  const isCustomerAvailabe = customers.some(customer => customer.id === parseInt(req.params.id));

  if (!isCustomerAvailabe) return res.status(400).json({ message: `OPPS the user with id ${req.params.id} is not available` });

  res.json({
    message: "Customer Deleted",
    customer: customers.filter(customers => customers.id !== parseInt(req.params.id))
  })

});

//create customer 
router.post('/', (req, res) => {
  const newCustomer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    order_item: req.body.order_item,
  }

  customers.push(newCustomer);

  res.json(customers);
});


module.exports = router;