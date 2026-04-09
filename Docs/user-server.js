const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

let users = [
  { id: 1, name: "Dev", age: 22 },
  { id: 2, name: "Ram", age: 25 }
];

app.get("/", (req, res) => {
  res.send("User API is running");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/user", (req, res) => {
  const userName = req.query.name;

  if (!userName) {
    return res.json({ message: "Name query is required" });
  }

  const foundUser = users.find(
    (user) => user.name.toLowerCase() === userName.toLowerCase()
  );

  if (!foundUser) {
    return res.json({ message: "User not found" });
  }

  res.json(foundUser);
});

app.post("/user", (req, res) => {
  try {
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
      message: "User added successfully",
      user: newUser
    });
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});