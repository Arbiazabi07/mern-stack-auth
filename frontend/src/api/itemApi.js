import axios from './axios';

export const getItems = async () => {
    try {
        const response = await axios.get('/items');
        return response.data;
    } catch (error) {
        console.error('Get items error:', error);
        return { success: false, items: [] };
    }
};

export const createItem = async (itemData) => {
    try {
        const response = await axios.post('/items', itemData);
        return response.data;
    } catch (error) {
        console.error('Create item error:', error);
        throw error;
    }
};

export const updateItem = async (id, itemData) => {
    try {
        const response = await axios.put(`/items/${id}`, itemData);
        return response.data;
    } catch (error) {
        console.error('Update item error:', error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Delete item error:', error);
        throw error;
    }
};

export const getStats = async () => {
    try {
        const response = await axios.get('/items/stats');
        return response.data;
    } catch (error) {
        console.error('Get stats error:', error);
        return { success: false, stats: { total: 0, active: 0, pending: 0, completed: 0 } };
    }
};