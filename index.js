const express = require("express");
var jwt = require('jsonwebtoken');
const { authMdw } = require('./authMdw')
const { connectToDb, db } = require("./db");
const app = express();
app.use(express.json());
app.use(authMdw)
app.get('/product', async (req, res) => {
  const products = await db.inventories.find({}).toArray()
  res.json(products)
})
app.get('/product/limit/', async (req, res) => {
  const { limit } = req.query
  const products = await db.inventories.find({ instock: { $lt: Number(limit) } }).toArray()

  res.json(products)
})
app.post('/login/', async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  const user = await db.users.find({ username: username, password: password })
  if (!user) {
    res.json('Ko dung ten hoac mat khau')
  }
  const jwtPayload = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(jwtPayload, "MINDX", {
    expiresIn: "1h",
  });
  res.json({
    msg: 'Success',
    token
  })
})
app.get('/order/', async (req, res) => {
  const orders = await db.orders.aggregate([{
    $lookup: {
      from: "inventories",
      localField: "item",
      foreignField: "sku",
      as: "inventory"
    }
  }]).toArray()




  res.json({
    orders
  })
})
app.listen(3000, () => {
  console.log("App is running at 3000");
  connectToDb();

});
