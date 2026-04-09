import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { 
  LayoutDashboard, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  User,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Save,
  Zap
} from 'lucide-react';
import { getItems, createItem, updateItem, deleteItem, getStats } from '../api/itemApi';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, completed: 0 });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'active'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [itemsRes, statsRes] = await Promise.all([
                getItems(),
                getStats()
            ]);
            setItems(itemsRes.items || []);
            setStats(statsRes.stats || { total: 0, active: 0, pending: 0, completed: 0 });
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch data');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            if (editingItem) {
                await updateItem(editingItem.id, formData);
                setMessage('Item updated successfully!');
            } else {
                await createItem(formData);
                setMessage('Item created successfully!');
            }
            
            setFormData({ title: '', description: '', status: 'active' });
            setEditingItem(null);
            setShowForm(false);
            setFormErrors({});
            await fetchData();
            
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description || '',
            status: item.status
        });
        setShowForm(true);
        setFormErrors({});
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
            try {
                await deleteItem(id);
                setMessage('Item deleted successfully');
                await fetchData();
                setTimeout(() => setMessage(''), 3000);
            } catch (err) {
                setError('Failed to delete item');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const item = items.find(i => i.id === id);
        if (item) {
            try {
                await updateItem(id, { ...item, status: newStatus });
                setMessage('Status updated successfully');
                await fetchData();
                setTimeout(() => setMessage(''), 3000);
            } catch (err) {
                setError('Failed to update status');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const StatCard = ({ title, value, color, icon, bgColor }) => (
        <div className={`bg-gradient-to-br ${bgColor} rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'bg-green-100 text-green-700 border-green-300';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    if (loading && items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                                <User className="w-4 h-4 text-gray-600" />
                                <span className="text-gray-700 font-medium">{user?.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Messages */}
                {message && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-fade-in">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {message}
                        </div>
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-fade-in">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        title="Total Items" 
                        value={stats.total} 
                        color="bg-blue-500"
                        bgColor="from-blue-50 to-blue-100"
                        icon={<Package className="w-6 h-6 text-blue-600" />}
                    />
                    <StatCard 
                        title="Active" 
                        value={stats.active} 
                        color="bg-green-500"
                        bgColor="from-green-50 to-green-100"
                        icon={<CheckCircle className="w-6 h-6 text-green-600" />}
                    />
                    <StatCard 
                        title="Pending" 
                        value={stats.pending} 
                        color="bg-yellow-500"
                        bgColor="from-yellow-50 to-yellow-100"
                        icon={<Clock className="w-6 h-6 text-yellow-600" />}
                    />
                    <StatCard 
                        title="Completed" 
                        value={stats.completed} 
                        color="bg-purple-500"
                        bgColor="from-purple-50 to-purple-100"
                        icon={<CheckCircle className="w-6 h-6 text-purple-600" />}
                    />
                </div>

                {/* Add Item Button */}
                <div className="mb-6">
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingItem(null);
                            setFormData({ title: '', description: '', status: 'active' });
                            setFormErrors({});
                        }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{showForm ? 'Cancel' : 'Add New Item'}</span>
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-slide-down border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editingItem ? '✏️ Edit Item' : '➕ Create New Item'}
                            </h2>
                            <button 
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-gray-900`}
                                        placeholder="Enter item title"
                                        value={formData.title}
                                        onChange={(e) => {
                                            setFormData({ ...formData, title: e.target.value });
                                            if (formErrors.title) setFormErrors({});
                                        }}
                                    />
                                    {formErrors.title && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="active">🟢 Active</option>
                                        <option value="pending">🟡 Pending</option>
                                        <option value="completed">🔵 Completed</option>
                                    </select>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-gray-900 resize-none"
                                        placeholder="Enter item description (optional)"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{loading ? 'Saving...' : (editingItem ? 'Update Item' : 'Create Item')}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingItem(null);
                                        setFormData({ title: '', description: '', status: 'active' });
                                    }}
                                    className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300"
                                >
                                    <X className="w-5 h-5" />
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Items List */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <Package className="w-5 h-5 mr-2 text-orange-500" />
                            Your Items
                        </h2>
                    </div>
                    
                    {items.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-gray-500 text-lg">No items yet.</p>
                            <p className="text-gray-400 text-sm">Click "Add New Item" to get started.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500 max-w-md truncate">
                                                    {item.description || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={item.status}
                                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                    className={`text-sm px-3 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 ${getStatusColor(item.status)}`}
                                                >
                                                    <option value="active">🟢 Active</option>
                                                    <option value="pending">🟡 Pending</option>
                                                    <option value="completed">🔵 Completed</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center space-x-1"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors inline-flex items-center space-x-1 ml-3"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;