import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, BriefcaseIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { workWithUsAPI } from '../../services/api';
import type { WorkWithUs } from '../../types/api';

const WorkWithUsManager: React.FC = () => {
  const [positions, setPositions] = useState<WorkWithUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<WorkWithUs | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    jobType: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'intern',
    department: '',
    location: '',
    experience: '',
    skills: [''],
    responsibilities: [''],
    requirements: [''],
    salary: {
      min: 0,
      max: 0,
      currency: 'INR',
      negotiable: false
    },
    benefits: [''],
    applicationLink: '',
    contactEmail: '',
    deadline: '',
    isActive: true,
    isUrgent: false
  });

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const response = await workWithUsAPI.getAllAdmin();
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const positionData = {
        ...formData,
        salary: {
          ...formData.salary,
          min: Number(formData.salary.min),
          max: Number(formData.salary.max)
        },
        skills: formData.skills.filter(skill => skill.trim() !== ''),
        responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ''),
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== '')
      };

      if (editingPosition) {
        await workWithUsAPI.update(editingPosition._id!, positionData);
      } else {
        await workWithUsAPI.create(positionData);
      }
      
      fetchPositions();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving position:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      try {
        await workWithUsAPI.delete(id);
        fetchPositions();
      } catch (error) {
        console.error('Error deleting position:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      jobType: 'full-time',
      department: '',
      location: '',
      experience: '',
      skills: [''],
      responsibilities: [''],
      requirements: [''],
      salary: {
        min: 0,
        max: 0,
        currency: 'INR',
        negotiable: false
      },
      benefits: [''],
      applicationLink: '',
      contactEmail: '',
      deadline: '',
      isActive: true,
      isUrgent: false
    });
    setEditingPosition(null);
  };

  const openEditModal = (position: WorkWithUs) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      description: position.description,
      jobType: position.jobType as 'full-time' | 'part-time' | 'contract' | 'intern',
      department: position.department,
      location: position.location,
      experience: position.experience,
      skills: position.skills.length > 0 ? position.skills : [''],
      responsibilities: position.responsibilities.length > 0 ? position.responsibilities : [''],
      requirements: position.requirements.length > 0 ? position.requirements : [''],
      salary: position.salary,
      benefits: position.benefits.length > 0 ? position.benefits : [''],
      applicationLink: position.applicationLink,
      contactEmail: position.contactEmail,
      deadline: position.deadline.split('T')[0],
      isActive: position.isActive,
      isUrgent: position.isUrgent
    });
    setIsModalOpen(true);
  };

  const addArrayField = (field: 'skills' | 'responsibilities' | 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'skills' | 'responsibilities' | 'requirements' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'skills' | 'responsibilities' | 'requirements' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const filteredPositions = positions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || position.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(positions.map(p => p.department))).filter(Boolean);

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
          <h1 className="text-2xl font-bold text-gray-900">Work With Us</h1>
          <p className="text-gray-600">Manage career opportunities and job positions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Add Position
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Positions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPositions.map((position) => (
          <motion.div
            key={position._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    position.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {position.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {position.isUrgent && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Urgent
                    </span>
                  )}
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {position.jobType}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(position)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(position._id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{position.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{position.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="h-4 w-4" />
                  <span>{position.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>{position.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>₹{position.salary.min.toLocaleString()} - ₹{position.salary.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPositions.length === 0 && (
        <div className="text-center py-12">
          <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
          <p className="text-gray-500">Get started by creating your first job position.</p>
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
                {editingPosition ? 'Edit Position' : 'Add New Position'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title *
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
                      Job Type *
                    </label>
                    <select
                      required
                      value={formData.jobType}
                      onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value as 'full-time' | 'part-time' | 'contract' | 'intern' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="intern">Intern</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Required *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="e.g., 2-4 years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Salary (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.salary.min}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        salary: { ...prev.salary, min: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Salary (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.salary.max}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        salary: { ...prev.salary, max: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.applicationLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, applicationLink: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Skills Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Skills
                    </label>
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => updateArrayField('skills', index, e.target.value)}
                          placeholder={`Skill ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('skills', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('skills')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Skill
                    </button>
                  </div>

                  {/* Other array fields can be added similarly */}

                  <div className="md:col-span-2 flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.salary.negotiable}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          salary: { ...prev.salary, negotiable: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Salary Negotiable</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isUrgent}
                        onChange={(e) => setFormData(prev => ({ ...prev, isUrgent: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Urgent</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {editingPosition ? 'Update Position' : 'Create Position'}
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

export default WorkWithUsManager;
