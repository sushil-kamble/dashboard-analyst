// Read from order.json and insert into sqlite3 database

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

const fs = require("fs");
const order = JSON.parse(fs.readFileSync("./order.json", "utf8"));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id INTEGER PRIMARY KEY,
      item_type TEXT,
      order_state TEXT,
      last_updated_time TEXT,
      branch INTEGER,
      customer_id INTEGER,
      amount REAL
    )
  `);

  const stmt = db.prepare("INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?, ?)");

  order.forEach((item) => {
    stmt.run(
      item.order_id,
      item.item_type,
      item.order_state,
      item.last_updated_time,
      item.branch,
      item.customer_id,
      item.amount
    );
  });

  stmt.finalize();

  db.each("SELECT * FROM orders", (err, row) => {
    console.log(row);
  });
});

// Close the database when you're done
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Database closed.");
});
