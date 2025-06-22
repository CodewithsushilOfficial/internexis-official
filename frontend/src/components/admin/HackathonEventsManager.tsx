import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';
import { hackathonEventsAPI } from '../../services/api';
import type { HackathonEvent } from '../../types/api';

const HackathonEventsManager: React.FC = () => {
  const [events, setEvents] = useState<HackathonEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<HackathonEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'hackathon' as 'hackathon' | 'tech-event' | 'workshop' | 'conference',
    startDate: '',
    endDate: '',
    location: '',
    registrationDeadline: '',
    maxParticipants: 0,
    registrationFee: 0,
    prizes: [''],
    requirements: [''],
    contactEmail: '',
    websiteUrl: '',
    isActive: true
  });

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await hackathonEventsAPI.getAllAdmin();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        maxParticipants: Number(formData.maxParticipants),
        registrationFee: Number(formData.registrationFee),
        prizes: formData.prizes.filter(prize => prize.trim() !== ''),
        requirements: formData.requirements.filter(req => req.trim() !== '')
      };

      if (editingEvent) {
        await hackathonEventsAPI.update(editingEvent._id!, eventData);
      } else {
        await hackathonEventsAPI.create(eventData);
      }
      
      fetchEvents();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await hackathonEventsAPI.delete(id);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      eventType: 'hackathon',
      startDate: '',
      endDate: '',
      location: '',
      registrationDeadline: '',
      maxParticipants: 0,
      registrationFee: 0,
      prizes: [''],
      requirements: [''],
      contactEmail: '',
      websiteUrl: '',
      isActive: true
    });
    setEditingEvent(null);
  };

  const openEditModal = (event: HackathonEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate.split('T')[0],
      location: event.location,
      registrationDeadline: event.registrationDeadline.split('T')[0],
      maxParticipants: event.maxParticipants,
      registrationFee: event.registrationFee,
      prizes: event.prizes.length > 0 ? event.prizes : [''],
      requirements: event.requirements.length > 0 ? event.requirements : [''],
      contactEmail: event.contactEmail,
      websiteUrl: event.websiteUrl || '',
      isActive: event.isActive
    });
    setIsModalOpen(true);
  };

  const addArrayField = (field: 'prizes' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'prizes' | 'requirements', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'prizes' | 'requirements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const getEventStatus = (event: HackathonEvent) => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    if (now < startDate) return 'upcoming';
    if (now >= startDate && now <= endDate) return 'ongoing';
    return 'completed';
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || getEventStatus(event) === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Hackathons & Events</h1>
          <p className="text-gray-600">Manage hackathons, tech events, and workshops</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Add Event
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'upcoming' | 'ongoing' | 'completed')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => {
          const status = getEventStatus(event);
          const statusColors = {
            upcoming: 'bg-blue-100 text-blue-800',
            ongoing: 'bg-green-100 text-green-800',
            completed: 'bg-gray-100 text-gray-800'
          };

          return (
            <motion.div
              key={event._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {event.eventType}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(event)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>                    <button
                      onClick={() => handleDelete(event._id!)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    <span>Max {event.maxParticipants} participants</span>
                  </div>
                  {event.registrationFee > 0 && (
                    <div className="text-green-600 font-medium">
                      Fee: ₹{event.registrationFee}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Get started by creating your first event.</p>
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
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title *
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
                      Event Type *
                    </label>
                    <select
                      required
                      value={formData.eventType}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value as 'hackathon' | 'tech-event' | 'workshop' | 'conference' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hackathon">Hackathon</option>
                      <option value="tech-event">Tech Event</option>
                      <option value="workshop">Workshop</option>
                      <option value="conference">Conference</option>
                    </select>
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
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Deadline *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.registrationDeadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Participants *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Fee (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.registrationFee}
                      onChange={(e) => setFormData(prev => ({ ...prev, registrationFee: parseInt(e.target.value) }))}
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
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Prizes */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prizes
                    </label>
                    {formData.prizes.map((prize, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={prize}
                          onChange={(e) => updateArrayField('prizes', index, e.target.value)}
                          placeholder={`Prize ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.prizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('prizes', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('prizes')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Prize
                    </button>
                  </div>

                  {/* Requirements */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requirements
                    </label>
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                          placeholder={`Requirement ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('requirements', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('requirements')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Requirement
                    </button>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
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

export default HackathonEventsManager;
