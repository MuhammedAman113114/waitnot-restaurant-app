import express from 'express';
import { reelDB } from '../db.js';

const router = express.Router();

// Get all reels
router.get('/', async (req, res) => {
  try {
    const reels = await reelDB.findAll();
    res.json(reels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create reel
router.post('/', async (req, res) => {
  try {
    console.log('Creating reel with data:', req.body);
    
    // Validate required fields
    if (!req.body.videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }
    if (!req.body.dishName) {
      return res.status(400).json({ error: 'Dish name is required' });
    }
    if (!req.body.price) {
      return res.status(400).json({ error: 'Price is required' });
    }
    if (!req.body.restaurantId) {
      return res.status(400).json({ error: 'Restaurant ID is required' });
    }
    
    const reel = await reelDB.create(req.body);
    console.log('Reel created:', reel);
    res.status(201).json(reel);
  } catch (error) {
    console.error('Error creating reel:', error);
    res.status(500).json({ error: error.message });
  }
});

// Increment views
router.patch('/:id/view', async (req, res) => {
  try {
    const reel = await reelDB.incrementViews(req.params.id);
    if (!reel) return res.status(404).json({ error: 'Reel not found' });
    res.json(reel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle like
router.patch('/:id/like', async (req, res) => {
  try {
    const reel = await reelDB.incrementLikes(req.params.id);
    if (!reel) return res.status(404).json({ error: 'Reel not found' });
    res.json(reel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update reel
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating reel:', req.params.id, 'with data:', req.body);
    const reel = await reelDB.update(req.params.id, req.body);
    if (!reel) {
      console.log('Reel not found:', req.params.id);
      return res.status(404).json({ error: 'Reel not found' });
    }
    console.log('Reel updated:', reel);
    res.json(reel);
  } catch (error) {
    console.error('Error updating reel:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete reel
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting reel:', req.params.id);
    const reel = await reelDB.delete(req.params.id);
    if (!reel) {
      console.log('Reel not found:', req.params.id);
      return res.status(404).json({ error: 'Reel not found' });
    }
    console.log('Reel deleted:', reel);
    res.json({ message: 'Reel deleted successfully', reel });
  } catch (error) {
    console.error('Error deleting reel:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
