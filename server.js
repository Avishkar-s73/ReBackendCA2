import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let loggedInUsers = [];

app.get("/login-users", async (req, res) => {
  try {
    res.status(200).json(loggedInUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({ message: "Email cannot be empty" });
    }
    if (!password) {
      return res.status(404).json({ message: "Password cannot be empty" });
    }

    const newUser = {
      email,
      password,
    };
    loggedInUsers.push(newUser);

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
