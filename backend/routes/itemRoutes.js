const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

// All routes protected
router.use(authMiddleware);

// Get all items
router.get('/', async (req, res) => {
    try {
        const [items] = await db.query(
            'SELECT * FROM items WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );
        res.json({ success: true, items });
    } catch (error) {
        console.error('Get items error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch items' });
    }
});

// Get stats
router.get('/stats', async (req, res) => {
    try {
        const [total] = await db.query(
            'SELECT COUNT(*) as count FROM items WHERE user_id = ?',
            [req.user.id]
        );
        const [active] = await db.query(
            'SELECT COUNT(*) as count FROM items WHERE user_id = ? AND status = "active"',
            [req.user.id]
        );
        const [pending] = await db.query(
            'SELECT COUNT(*) as count FROM items WHERE user_id = ? AND status = "pending"',
            [req.user.id]
        );
        const [completed] = await db.query(
            'SELECT COUNT(*) as count FROM items WHERE user_id = ? AND status = "completed"',
            [req.user.id]
        );
        
        res.json({
            success: true,
            stats: {
                total: total[0].count,
                active: active[0].count,
                pending: pending[0].count,
                completed: completed[0].count
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch stats' });
    }
});

// Create item
router.post('/', async (req, res) => {
    console.log('Create item request:', req.body);
    console.log('User ID:', req.user.id);
    
    try {
        const { title, description, status } = req.body;
        
        if (!title || title.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                message: 'Title is required' 
            });
        }
        
        const [result] = await db.query(
            'INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)',
            [req.user.id, title.trim(), description || null, status || 'active']
        );
        
        const [newItem] = await db.query(
            'SELECT * FROM items WHERE id = ?',
            [result.insertId]
        );
        
        res.status(201).json({
            success: true,
            message: 'Item created successfully',
            item: newItem[0]
        });
    } catch (error) {
        console.error('Create item error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create item: ' + error.message 
        });
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        
        await db.query(
            'UPDATE items SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
            [title, description, status, req.params.id, req.user.id]
        );
        
        res.json({ success: true, message: 'Item updated successfully' });
    } catch (error) {
        console.error('Update item error:', error);
        res.status(500).json({ success: false, message: 'Failed to update item' });
    }
});

// Delete item
router.delete('/:id', async (req, res) => {
    try {
        await db.query(
            'DELETE FROM items WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );
        
        res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Delete item error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete item' });
    }
});

module.exports = router;