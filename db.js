const { MongoClient } = require("mongodb");

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb+srv://khainguyendn123:khai123456@testdb.2zq80el.mongodb.net/");
  client.connect(() => {
    const database = client.db("khai");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");
  });
  
};
module.exports = { connectToDb, db };
