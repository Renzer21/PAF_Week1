const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const itemRoutes = require("./routes/items");
app.use("/items", itemRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("MongoDB Connection Error:", err));
    
// Define Schema
app.get("/", (req, res) => {
    res.send("MERN App Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
