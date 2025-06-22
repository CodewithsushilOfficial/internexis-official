import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, BookOpenIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { careerGuidanceAPI } from '../../services/api';
import type { CareerGuidance } from '../../types/api';

const CareerGuidanceManager: React.FC = () => {
  const [guides, setGuides] = useState<CareerGuidance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<CareerGuidance | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'article' as 'article' | 'video' | 'podcast' | 'infographic' | 'guide',
    category: '',
    targetAudience: '',
    content: '',
    author: {
      name: '',
      title: '',
      image: ''
    },
    tags: [''],
    featuredImage: '',
    externalLink: '',
    duration: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    isPublished: true,
    isFeatured: false,
    publishedDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const response = await careerGuidanceAPI.getAllAdmin();
      setGuides(response.data);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const guideData = {
        ...formData,
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        views: 0,
        likes: 0
      };

      if (editingGuide) {
        await careerGuidanceAPI.update(editingGuide._id!, guideData);
      } else {
        await careerGuidanceAPI.create(guideData);
      }
      
      fetchGuides();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving guide:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      try {
        await careerGuidanceAPI.delete(id);
        fetchGuides();
      } catch (error) {
        console.error('Error deleting guide:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      contentType: 'article',
      category: '',
      targetAudience: '',
      content: '',
      author: {
        name: '',
        title: '',
        image: ''
      },
      tags: [''],
      featuredImage: '',
      externalLink: '',
      duration: '',
      difficulty: 'beginner',
      isPublished: true,
      isFeatured: false,
      publishedDate: new Date().toISOString().split('T')[0]
    });
    setEditingGuide(null);
  };

  const openEditModal = (guide: CareerGuidance) => {
    setEditingGuide(guide);
    setFormData({
      title: guide.title,
      description: guide.description,
      contentType: guide.contentType as 'article' | 'video' | 'podcast' | 'infographic' | 'guide',
      category: guide.category,
      targetAudience: guide.targetAudience,
      content: guide.content,
      author: {
        ...guide.author,
        image: guide.author.image || ''
      },
      tags: guide.tags.length > 0 ? guide.tags : [''],
      featuredImage: guide.featuredImage || '',
      externalLink: guide.externalLink || '',
      duration: guide.duration || '',
      difficulty: guide.difficulty as 'beginner' | 'intermediate' | 'advanced',
      isPublished: guide.isPublished,
      isFeatured: guide.isFeatured,
      publishedDate: guide.publishedDate.split('T')[0]
    });
    setIsModalOpen(true);
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || guide.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(guides.map(g => g.category))).filter(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Career Guidance</h1>
          <p className="text-gray-600">Manage career guidance content and resources</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Add Guide
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map((guide) => (
          <motion.div
            key={guide._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    guide.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {guide.isPublished ? 'Published' : 'Draft'}
                  </span>
                  {guide.isFeatured && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {guide.contentType}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(guide)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(guide._id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {guide.featuredImage && (
                <img 
                  src={guide.featuredImage} 
                  alt={guide.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guide.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4" />
                  <span>{guide.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <EyeIcon className="h-4 w-4" />
                  <span>{guide.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon className="h-4 w-4" />
                  <span>{guide.likes} likes</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">By {guide.author.name}</p>
                <div className="flex flex-wrap gap-1">
                  {guide.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {guide.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{guide.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No guides found</h3>
          <p className="text-gray-500">Get started by creating your first career guide.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {editingGuide ? 'Edit Guide' : 'Add New Guide'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content Type *
                    </label>
                    <select
                      required
                      value={formData.contentType}
                      onChange={(e) => setFormData(prev => ({ ...prev, contentType: e.target.value as 'article' | 'video' | 'podcast' | 'infographic' | 'guide' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="article">Article</option>
                      <option value="video">Video</option>
                      <option value="podcast">Podcast</option>
                      <option value="infographic">Infographic</option>
                      <option value="guide">Guide</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Audience *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.targetAudience}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty Level *
                    </label>
                    <select
                      required
                      value={formData.difficulty}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        author: { ...prev.author, name: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author.title}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        author: { ...prev.author, title: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (if applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 10 min read, 30 min video"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Published Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.publishedDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      External Link (if applicable)
                    </label>
                    <input
                      type="url"
                      value={formData.externalLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, externalLink: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Tags Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => updateTag(index, e.target.value)}
                          placeholder={`Tag ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.tags.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTag}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Tag
                    </button>
                  </div>

                  <div className="md:col-span-2 flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Published</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {editingGuide ? 'Update Guide' : 'Create Guide'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerGuidanceManager;
