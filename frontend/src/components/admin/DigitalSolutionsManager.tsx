import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

interface DigitalSolution {
  _id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  technologies: string[];
  price: {
    startingPrice: number;
    currency: string;
  };
  duration: string;
  image?: string;
  portfolioLink?: string;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

const DigitalSolutionsManager: React.FC = () => {
  const [solutions, setSolutions] = useState<DigitalSolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DigitalSolution | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    features: [''],
    technologies: [''],
    price: {
      startingPrice: 0,
      currency: 'INR'
    },
    duration: '',
    image: '',
    portfolioLink: '',
    isActive: true,
    priority: 0
  });

  const categories = [
    'Web Development',
    'App Development',
    'AI Automation',
    'UI/UX Design',
    'Digital Marketing',
    'Other'
  ];

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/digital-solutions/admin/all`);
      if (response.data.success) {
        setSolutions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching solutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // Clean up empty features and technologies
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        technologies: formData.technologies.filter(t => t.trim() !== '')
      };

      if (editingItem) {
        await axios.put(`${API_URL}/api/digital-solutions/admin/${editingItem._id}`, cleanedData);
      } else {
        await axios.post(`${API_URL}/api/digital-solutions/admin`, cleanedData);
      }

      await fetchSolutions();
      resetForm();
    } catch (error) {
      console.error('Error saving solution:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${API_URL}/api/digital-solutions/admin/${id}`);
      await fetchSolutions();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting solution:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Web Development',
      features: [''],
      technologies: [''],
      price: {
        startingPrice: 0,
        currency: 'INR'
      },
      duration: '',
      image: '',
      portfolioLink: '',
      isActive: true,
      priority: 0
    });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleEdit = (solution: DigitalSolution) => {
    setFormData({
      title: solution.title,
      description: solution.description,
      category: solution.category,
      features: solution.features.length ? solution.features : [''],
      technologies: solution.technologies.length ? solution.technologies : [''],
      price: solution.price,
      duration: solution.duration,
      image: solution.image || '',
      portfolioLink: solution.portfolioLink || '',
      isActive: solution.isActive,
      priority: solution.priority
    });
    setEditingItem(solution);
    setShowAddForm(true);
  };

  const addArrayField = (field: 'features' | 'technologies') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'features' | 'technologies', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'features' | 'technologies', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solution.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || solution.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading && solutions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Digital Solutions</h1>
            <p className="text-gray-600">Manage your digital services and solutions</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Solution</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredSolutions.map((solution) => (
          <motion.div
            key={solution._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {solution.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {solution.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      solution.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {solution.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Price:</strong> ₹{solution.price.startingPrice}+ {solution.price.currency}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {solution.duration}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Priority:</strong> {solution.priority}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(solution)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(solution._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(solution.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit Solution' : 'Add New Solution'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateArrayField('features', index, e.target.value)}
                        placeholder="Enter feature"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('features', index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('features')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Feature
                  </button>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies
                  </label>
                  {formData.technologies.map((tech, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateArrayField('technologies', index, e.target.value)}
                        placeholder="Enter technology"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayField('technologies', index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('technologies')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Technology
                  </button>
                </div>

                {/* Price and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Price (INR)
                    </label>
                    <input
                      type="number"
                      value={formData.price.startingPrice}
                      onChange={(e) => setFormData({
                        ...formData,
                        price: { ...formData.price, startingPrice: parseInt(e.target.value) || 0 }
                      })}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 2-4 weeks"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Additional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Link
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioLink}
                      onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority (0-10)
                    </label>
                    <input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 0})}
                      min="0"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center pt-8">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this digital solution? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DigitalSolutionsManager;
