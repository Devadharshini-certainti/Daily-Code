const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.post("/user", (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    if (!age) {
      return res.json({ error: "Age is required" });
    }

    if (age < 0) {
      return res.json({ error: "Age cannot be negative" });
    }

    res.json({
      message: "User created successfully",
      user: { name, age }
    });

  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});