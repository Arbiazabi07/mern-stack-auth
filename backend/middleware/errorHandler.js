const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    
    // Handle MySQL duplicate entry error
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ 
            success: false, 
            message: 'Email already exists. Please use a different email.' 
        });
    }
    
    // Handle MySQL foreign key error
    if (err.code === 'ER_NO_REFERENCED_ROW') {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid reference: User does not exist.' 
        });
    }
    
    // Handle MySQL connection errors
    if (err.code === 'ECONNREFUSED') {
        return res.status(500).json({ 
            success: false, 
            message: 'Database connection failed. Please try again later.' 
        });
    }
    
    // Default error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;