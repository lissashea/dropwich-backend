import db from "../db/connection.js";
import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
// import orders from "./orders.json" assert { type: "json" };
// import users from "./users.json" assert { type: "json" };

const insertData = async () => {
  // Reset Database
  await db.dropDatabase();
  // Insert Characters into the Database
  await Character.insertMany(characters);
  // Insert Houses into the Database
  await House.insertMany(houses);
  // Close DB connection
  db.close();
};

insertData();