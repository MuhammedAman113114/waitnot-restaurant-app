import express from 'express';
import { reelDB } from '../db.js';

const router = express.Router();

// Get all reels (optionally filter by restaurant)
router.get('/', async (req, res) => {
  try {
    const reels = await reelDB.findAll();
    
    // Filter by restaurant if restaurantId query param is provided
    const { restaurantId } = req.query;
    if (restaurantId) {
      const filteredReels = reels.filter(reel => {
        const reelRestaurantId = reel.restaurantId?._id || reel.restaurantId;
        return reelRestaurantId === restaurantId;
      });
      console.log(`Filtered reels for restaurant ${restaurantId}:`, filteredReels.length);
      return res.json(filteredReels);
    }
    
    res.json(reels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reels by restaurant ID (dedicated endpoint for better clarity)
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reels = await reelDB.findAll();
    
    const filteredReels = reels.filter(reel => {
      const reelRestaurantId = reel.restaurantId?._id || reel.restaurantId;
      return reelRestaurantId === restaurantId;
    });
    
    console.log(`Reels for restaurant ${restaurantId}:`, filteredReels.length);
    res.json(filteredReels);
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
    
    // Get existing reel to verify ownership
    const existingReel = await reelDB.findById(req.params.id);
    if (!existingReel) {
      console.log('Reel not found:', req.params.id);
      return res.status(404).json({ error: 'Reel not found' });
    }
    
    // Verify restaurant ownership if restaurantId is provided in request
    if (req.body.restaurantId && existingReel.restaurantId !== req.body.restaurantId) {
      console.warn('⚠️ Unauthorized reel update attempt');
      console.warn('Reel belongs to:', existingReel.restaurantId);
      console.warn('Update requested by:', req.body.restaurantId);
      return res.status(403).json({ error: 'Unauthorized: Cannot update reels from another restaurant' });
    }
    
    const reel = await reelDB.update(req.params.id, req.body);
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
    
    // Get existing reel to verify it exists
    const existingReel = await reelDB.findById(req.params.id);
    if (!existingReel) {
      console.log('Reel not found:', req.params.id);
      return res.status(404).json({ error: 'Reel not found' });
    }
    
    // Optional: Add restaurant verification if restaurantId is provided in query
    if (req.query.restaurantId && existingReel.restaurantId !== req.query.restaurantId) {
      console.warn('⚠️ Unauthorized reel deletion attempt');
      console.warn('Reel belongs to:', existingReel.restaurantId);
      console.warn('Delete requested by:', req.query.restaurantId);
      return res.status(403).json({ error: 'Unauthorized: Cannot delete reels from another restaurant' });
    }
    
    const reel = await reelDB.delete(req.params.id);
    console.log('Reel deleted:', reel);
    res.json({ message: 'Reel deleted successfully', reel });
  } catch (error) {
    console.error('Error deleting reel:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
