const express = require("express");

const app = express();
const PORT = 5002;

app.use(express.json());

// sample data
let users = [
  { id: 1, name: "Dev", age: 22 },
  { id: 2, name: "Ram", age: 25 }
];

// home route
app.get("/", (req, res) => {
  res.send("User CRUD API is running");
});


// ======================
// GET all users
// ======================
app.get("/users", (req, res) => {
  res.json(users);
});


// ======================
// GET user by ID
// ======================
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  res.json(user);
});


// ======================
// CREATE user
// ======================
app.post("/user", (req, res) => {
  const { name, age } = req.body;

  if (!name || !name.trim()) {
    return res.json({ message: "Name is required" });
  }

  if (age === undefined) {
    return res.json({ message: "Age is required" });
  }

  if (age < 0) {
    return res.json({ message: "Age cannot be negative" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age
  };

  users.push(newUser);

  res.json({
    message: "User created",
    user: newUser
  });
});


// ======================
// UPDATE user
// ======================
app.put("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  if (name) user.name = name;
  if (age !== undefined) user.age = age;

  res.json({
    message: "User updated",
    user
  });
});


// ======================
// DELETE user
// ======================
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);

  res.json({
    message: "User deleted",
    user: deletedUser[0]
  });
});


// ======================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});