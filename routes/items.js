const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Get all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new item
router.post("/", async (req, res) => {
    try {
        const newItem = new Item({ name: req.body.name });
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an item
router.put("/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an item
router.delete("/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
