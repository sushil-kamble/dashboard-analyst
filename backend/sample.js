const fs = require("fs");

const itemTypes = [
  "Cake",
  "Cookies",
  "Cookies",
  "Cookies",
  "Muffins",
  "Muffins",
  "Cookies",
  "Cake",
  "Muffins",
]; // Uneven distribution
const orderStates = [
  "Created",
  "Shipped",
  "Delivered",
  "Canceled",
  "Delivered",
];
const startDate = new Date();
startDate.setDate(startDate.getDate() - 30);

function getRandomDate() {
  const randomDate = new Date(
    startDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  );
  return randomDate.toISOString().slice(0, -5).toString().split("T").join(" ");
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const orders = [];
for (let i = 1; i <= 100000; i++) {
  const order = {
    order_id: i,
    item_type: itemTypes[getRandomInt(0, itemTypes.length - 1)],
    order_state: orderStates[getRandomInt(0, orderStates.length - 1)],
    last_updated_time: getRandomDate(),
    branch: Math.floor(Math.random() * 1000) + 1,
    customer_id: Math.floor(Math.random() * 10000) + 1,
    amount: 0,
  };
  switch (order.item_type) {
    case "Cake":
      order.amount = 500;
      break;
    case "Cookies":
      order.amount = 50;
      break;
    case "Muffins":
      order.amount = 100;
      break;
  }
  orders.push(order);
}

const jsonContent = JSON.stringify(orders, null, 2);
fs.writeFileSync("order.json", jsonContent);
console.log("order.json has been generated.");
