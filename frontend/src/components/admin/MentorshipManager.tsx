import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { mentorshipAPI } from "../../services/api";
import type { Mentorship } from "../../types/api";

const MentorshipManager: React.FC = () => {
  const [mentors, setMentors] = useState<Mentorship[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentorship | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState<string>("all");
  const [formData, setFormData] = useState({
    mentorName: "",
    mentorTitle: "",
    expertise: [""],
    description: "",
    experience: "",
    company: "",
    mentorImage: "",
    linkedinProfile: "",
    sessionTypes: [""],
    pricing: {
      sessionPrice: 0,
      currency: "INR",
      duration: "60 minutes",
    },
    availability: {
      timezone: "IST",
      preferredDays: [""],
      preferredTime: "",
    },
    bookingLink: "",
    contactEmail: "",
    rating: 0,
    languages: [""],
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await mentorshipAPI.getAllAdmin();
      setMentors(response.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const mentorData = {
        ...formData,
        pricing: {
          ...formData.pricing,
          sessionPrice: Number(formData.pricing.sessionPrice),
        },
        expertise: formData.expertise.filter((exp) => exp.trim() !== ""),
        sessionTypes: formData.sessionTypes.filter(
          (type) => type.trim() !== "",
        ),
        languages: formData.languages.filter((lang) => lang.trim() !== ""),
        availability: {
          ...formData.availability,
          preferredDays: formData.availability.preferredDays.filter(
            (day) => day.trim() !== "",
          ),
        },
      };

      if (editingMentor) {
        await mentorshipAPI.update(editingMentor._id!, mentorData);
      } else {
        await mentorshipAPI.create(mentorData);
      }

      fetchMentors();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving mentor:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this mentor?")) {
      try {
        await mentorshipAPI.delete(id);
        fetchMentors();
      } catch (error) {
        console.error("Error deleting mentor:", error);
      }
    }
  };
  const resetForm = () => {
    setFormData({
      mentorName: "",
      mentorTitle: "",
      expertise: [""],
      description: "",
      experience: "",
      company: "",
      mentorImage: "",
      linkedinProfile: "",
      sessionTypes: [""],
      pricing: {
        sessionPrice: 0,
        currency: "INR",
        duration: "60 minutes",
      },
      availability: {
        timezone: "IST",
        preferredDays: [""],
        preferredTime: "",
      },
      bookingLink: "",
      contactEmail: "",
      rating: 0,
      languages: [""],
      isActive: true,
      isFeatured: false,
    });
    setEditingMentor(null);
  };
  const openEditModal = (mentor: Mentorship) => {
    setEditingMentor(mentor);
    setFormData({
      mentorName: mentor.mentorName,
      mentorTitle: mentor.mentorTitle,
      expertise: mentor.expertise.length > 0 ? mentor.expertise : [""],
      description: mentor.description,
      experience: mentor.experience,
      company: mentor.company,
      mentorImage: mentor.mentorImage || "",
      linkedinProfile: mentor.linkedinProfile || "",
      sessionTypes: mentor.sessionTypes.length > 0 ? mentor.sessionTypes : [""],
      pricing: mentor.pricing,
      availability: {
        ...mentor.availability,
        preferredDays:
          mentor.availability.preferredDays.length > 0
            ? mentor.availability.preferredDays
            : [""],
      },
      bookingLink: mentor.bookingLink,
      contactEmail: mentor.contactEmail,
      rating: mentor.rating || 0,
      languages: mentor.languages.length > 0 ? mentor.languages : [""],
      isActive: mentor.isActive,
      isFeatured: mentor.isFeatured,
    });
    setIsModalOpen(true);
  };
  const addArrayField = (
    field: "expertise" | "sessionTypes" | "preferredDays" | "languages",
  ) => {
    if (field === "preferredDays") {
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          preferredDays: [...prev.availability.preferredDays, ""],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], ""],
      }));
    }
  };
  const updateArrayField = (
    field: "expertise" | "sessionTypes" | "preferredDays" | "languages",
    index: number,
    value: string,
  ) => {
    if (field === "preferredDays") {
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          preferredDays: prev.availability.preferredDays.map((item, i) =>
            i === index ? value : item,
          ),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].map((item, i) => (i === index ? value : item)),
      }));
    }
  };
  const removeArrayField = (
    field: "expertise" | "sessionTypes" | "preferredDays" | "languages",
    index: number,
  ) => {
    if (field === "preferredDays") {
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          preferredDays: prev.availability.preferredDays.filter(
            (_, i) => i !== index,
          ),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise =
      expertiseFilter === "all" || mentor.expertise.includes(expertiseFilter);
    return matchesSearch && matchesExpertise;
  });

  const allExpertise = Array.from(
    new Set(mentors.flatMap((m) => m.expertise)),
  ).filter(Boolean);

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
          <h1 className="text-2xl font-bold text-gray-900">
            Mentorship Program
          </h1>
          <p className="text-gray-600">
            Manage mentors and mentorship sessions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Add Mentor
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={expertiseFilter}
            onChange={(e) => setExpertiseFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Expertise</option>
            {allExpertise.map((expertise) => (
              <option key={expertise} value={expertise}>
                {expertise}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <motion.div
            key={mentor._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mentor.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {mentor.isActive ? "Active" : "Inactive"}
                  </span>
                  {mentor.isFeatured && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(mentor)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(mentor._id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="text-center mb-4">
                {mentor.mentorImage && (
                  <img
                    src={mentor.mentorImage}
                    alt={mentor.mentorName}
                    className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-900">
                  {mentor.mentorName}
                </h3>
                <p className="text-sm text-gray-600">{mentor.mentorTitle}</p>
                <p className="text-sm text-gray-500">{mentor.company}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span>{mentor.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>
                    ₹{mentor.pricing.sessionPrice}/{mentor.pricing.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="h-4 w-4" />
                  <span>
                    {mentor.rating || 0}/5 ({mentor.totalSessions || 0}{" "}
                    sessions)
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {mentor.expertise.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{mentor.expertise.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No mentors found
          </h3>
          <p className="text-gray-500">
            Get started by adding your first mentor.
          </p>
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
                {editingMentor ? "Edit Mentor" : "Add New Mentor"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mentor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.mentorName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mentorName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title/Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.mentorTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mentorTitle: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          experience: e.target.value,
                        }))
                      }
                      placeholder="e.g., 5+ years in Product Management"
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.mentorImage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mentorImage: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinProfile}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          linkedinProfile: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.pricing.sessionPrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            sessionPrice: parseInt(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Session Duration
                    </label>
                    <select
                      value={formData.pricing.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            duration: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="30 minutes">30 minutes</option>
                      <option value="60 minutes">60 minutes</option>
                      <option value="90 minutes">90 minutes</option>
                      <option value="120 minutes">120 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.bookingLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bookingLink: e.target.value,
                        }))
                      }
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactEmail: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Expertise Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Areas of Expertise
                    </label>
                    {formData.expertise.map((exp, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={exp}
                          onChange={(e) =>
                            updateArrayField("expertise", index, e.target.value)
                          }
                          placeholder={`Expertise ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.expertise.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField("expertise", index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}{" "}
                    <button
                      type="button"
                      onClick={() => addArrayField("expertise")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Expertise
                    </button>
                  </div>

                  {/* Languages Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Languages
                    </label>
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={lang}
                          onChange={(e) =>
                            updateArrayField("languages", index, e.target.value)
                          }
                          placeholder={`Language ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.languages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField("languages", index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("languages")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Language
                    </button>
                  </div>

                  <div className="md:col-span-2 flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isActive: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isFeatured: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Featured
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {editingMentor ? "Update Mentor" : "Create Mentor"}
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

export default MentorshipManager;
