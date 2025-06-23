const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ msg: 'Error fetching products.' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;
    if (!name || !quantity || !price || !category) return res.status(400).json({ msg: 'All fields required.' });
    const product = await Product.create({ name, quantity, price, category });
    res.json(product);
  } catch {
    res.status(500).json({ msg: 'Error creating product.' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Product not found.' });
    res.json(updated);
  } catch {
    res.status(500).json({ msg: 'Error updating product.' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Product not found.' });
    res.json({ msg: 'Product deleted.' });
  } catch {
    res.status(500).json({ msg: 'Error deleting product.' });
  }
});

module.exports = router;
