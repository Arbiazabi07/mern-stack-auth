const db = require('../config/db');

exports.getItems = async (req, res) => {
    try {
        const [items] = await db.query(
            'SELECT * FROM items WHERE user_id = ?',
            [req.user.id]
        );
        res.json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)',
            [req.user.id, title, description, status || 'active']
        );
        
        res.status(201).json({ 
            success: true, 
            message: 'Item created',
            item: { id: result.insertId, title, description, status }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updateItem = async (req, res) => {
    try {
        await db.query(
            'UPDATE items SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
            [req.body.title, req.body.description, req.body.status, req.params.id, req.user.id]
        );
        res.json({ success: true, message: 'Item updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        await db.query('DELETE FROM items WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
        res.json({ success: true, message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getStats = async (req, res) => {
    try {
        const [total] = await db.query('SELECT COUNT(*) as count FROM items WHERE user_id = ?', [req.user.id]);
        res.json({ success: true, stats: { total: total[0].count, active: 0, pending: 0, completed: 0 } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};