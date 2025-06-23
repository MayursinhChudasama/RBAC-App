import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/roles", async (req, res) => {
  const roles = await fs.readFile("./data/roles.json", "utf8");
  res.json(JSON.parse(roles));
});
app.get("/permissions", async (req, res) => {
  const permissions = await fs.readFile("./data/permissions.json", "utf8");
  res.json(JSON.parse(permissions));
});
app.get("/users", async (req, res) => {
  const users = await fs.readFile("./data/users.json", "utf8");
  res.json(JSON.parse(users));
});
app.get("/todos", async (req, res) => {
  const todos = await fs.readFile("./data/todos.json", "utf8");
  res.json(JSON.parse(todos));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  // const newOrder = {
  //   ...orderData,
  //   id: (Math.random() * 1000).toString(),
  // };
  // const orders = await fs.readFile("./data/orders.json", "utf8");
  // const allOrders = JSON.parse(orders);
  // allOrders.push(newOrder);
  // await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  // res.status(201).json({ message: "Order created!" });

  //
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000);
