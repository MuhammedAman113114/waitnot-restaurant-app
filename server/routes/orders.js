import express from 'express';
import { orderDB } from '../db.js';

const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const order = await orderDB.create(req.body);
    
    const io = req.app.get('io');
    io.to(`restaurant-${order.restaurantId}`).emit('new-order', order);
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders by restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const orders = await orderDB.findByRestaurant(req.params.restaurantId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    // First, get the order to verify it exists and get its restaurantId
    const existingOrder = await orderDB.findById(req.params.id);
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Optional: Add restaurant verification if restaurantId is provided in request
    // This ensures a restaurant can only update their own orders
    if (req.body.restaurantId && existingOrder.restaurantId !== req.body.restaurantId) {
      return res.status(403).json({ error: 'Unauthorized: Cannot update orders from another restaurant' });
    }
    
    const order = await orderDB.update(req.params.id, { status: req.body.status });
    
    const io = req.app.get('io');
    io.to(`restaurant-${order.restaurantId}`).emit('order-updated', order);
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
  try {
    const order = await orderDB.update(req.params.id, {
      paymentStatus: 'paid',
      paymentMethod: req.body.paymentMethod
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
