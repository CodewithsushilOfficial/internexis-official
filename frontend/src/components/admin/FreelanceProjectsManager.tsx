import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { freelanceProjectsAPI } from "../../services/api";
import type { FreelanceProject } from "../../types/api";

const FreelanceProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<FreelanceProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<FreelanceProject | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    client: {
      name: "",
      company: "",
      location: "",
      testimonial: "",
      rating: 5,
    },
    technologies: [""],
    projectImages: [""],
    liveLink: "",
    githubLink: "",
    portfolioLink: "",
    startDate: "",
    endDate: "",
    duration: "",
    budget: {
      amount: 0,
      currency: "INR",
    },
    status: "planning",
    projectType: "web-development",
    isShowcase: false,
    isFeatured: false,
    challenges: [""],
    solutions: [""],
    keyFeatures: [""],
    completionPercentage: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await freelanceProjectsAPI.getAllAdmin();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        budget: {
          ...formData.budget,
          amount: Number(formData.budget.amount),
        },
        client: {
          ...formData.client,
          rating: Number(formData.client.rating),
        },
        completionPercentage: Number(formData.completionPercentage),
        technologies: formData.technologies.filter(
          (tech) => tech.trim() !== "",
        ),
        projectImages: formData.projectImages.filter(
          (img) => img.trim() !== "",
        ),
        challenges: formData.challenges.filter(
          (challenge) => challenge.trim() !== "",
        ),
        solutions: formData.solutions.filter(
          (solution) => solution.trim() !== "",
        ),
        keyFeatures: formData.keyFeatures.filter(
          (feature) => feature.trim() !== "",
        ),
      };

      if (editingProject) {
        await freelanceProjectsAPI.update(editingProject._id!, projectData);
      } else {
        await freelanceProjectsAPI.create(projectData);
      }

      fetchProjects();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await freelanceProjectsAPI.delete(id);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      client: {
        name: "",
        company: "",
        location: "",
        testimonial: "",
        rating: 5,
      },
      technologies: [""],
      projectImages: [""],
      liveLink: "",
      githubLink: "",
      portfolioLink: "",
      startDate: "",
      endDate: "",
      duration: "",
      budget: {
        amount: 0,
        currency: "INR",
      },
      status: "planning",
      projectType: "web-development",
      isShowcase: false,
      isFeatured: false,
      challenges: [""],
      solutions: [""],
      keyFeatures: [""],
      completionPercentage: 0,
    });
    setEditingProject(null);
  };
  const openEditModal = (project: FreelanceProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      client: {
        name: project.client.name,
        company: project.client.company || "",
        location: project.client.location || "",
        testimonial: project.client.testimonial || "",
        rating: project.client.rating,
      },
      technologies:
        project.technologies.length > 0 ? project.technologies : [""],
      projectImages:
        project.projectImages.length > 0 ? project.projectImages : [""],
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      portfolioLink: project.portfolioLink || "",
      startDate: project.startDate ? project.startDate.split("T")[0] : "",
      endDate: project.endDate ? project.endDate.split("T")[0] : "",
      duration: project.duration,
      budget: project.budget,
      status: project.status,
      projectType: project.projectType,
      isShowcase: project.isShowcase,
      isFeatured: project.isFeatured,
      challenges: project.challenges.length > 0 ? project.challenges : [""],
      solutions: project.solutions.length > 0 ? project.solutions : [""],
      keyFeatures: project.keyFeatures.length > 0 ? project.keyFeatures : [""],
      completionPercentage: project.completionPercentage,
    });
    setIsModalOpen(true);
  };
  const addArrayField = (
    field:
      | "technologies"
      | "projectImages"
      | "challenges"
      | "solutions"
      | "keyFeatures",
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const updateArrayField = (
    field:
      | "technologies"
      | "projectImages"
      | "challenges"
      | "solutions"
      | "keyFeatures",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) =>
        i === index ? value : item,
      ),
    }));
  };

  const removeArrayField = (
    field:
      | "technologies"
      | "projectImages"
      | "challenges"
      | "solutions"
      | "keyFeatures",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index),
    }));
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "on-hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            Freelance Projects
          </h1>
          <p className="text-gray-600">
            Manage and showcase your project portfolio
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Add Project
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.div
            key={project._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                  >
                    {project.status.replace("-", " ").toUpperCase()}
                  </span>{" "}
                  {project.isFeatured && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                  {project.isShowcase && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Showcase
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>{" "}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>
                    {project.budget.currency}{" "}
                    {project.budget.amount.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Client:</span>{" "}
                  {project.client.name}
                  {project.client.company && ` - ${project.client.company}`}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Progress:</span>{" "}
                  {project.completionPercentage}%
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>{" "}
              {(project.liveLink ||
                project.githubLink ||
                project.portfolioLink) && (
                <div className="mt-4 flex gap-2">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                      title="Live Link"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                      title="GitHub Repository"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {project.portfolioLink && (
                    <a
                      href={project.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800"
                      title="Portfolio Link"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500">
            Get started by adding your first project.
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
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
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
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>{" "}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      placeholder="e.g., 2-3 months"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          client: { ...prev.client, name: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>{" "}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Company
                    </label>
                    <input
                      type="text"
                      value={formData.client.company}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          client: { ...prev.client, company: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Location
                    </label>
                    <input
                      type="text"
                      value={formData.client.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          client: { ...prev.client, location: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Rating (1-5) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="5"
                      value={formData.client.rating}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          client: {
                            ...prev.client,
                            rating: parseInt(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.budget.amount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            amount: parseInt(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>{" "}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Currency *
                    </label>
                    <select
                      required
                      value={formData.budget.currency}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          budget: { ...prev.budget, currency: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>{" "}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Testimonial
                    </label>
                    <textarea
                      rows={2}
                      value={formData.client.testimonial}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          client: {
                            ...prev.client,
                            testimonial: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          projectType: e.target.value,
                        }))
                      }
                      placeholder="e.g., web-development, mobile-app"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>{" "}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Status *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      placeholder="e.g., planning, in-progress, completed"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>{" "}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Completion Percentage *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.completionPercentage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          completionPercentage: parseInt(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>{" "}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Live Link
                    </label>
                    <input
                      type="url"
                      value={formData.liveLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          liveLink: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub Repository
                    </label>
                    <input
                      type="url"
                      value={formData.githubLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          githubLink: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio Link
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioLink}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          portfolioLink: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* Technologies Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technologies Used
                    </label>
                    {formData.technologies.map((tech, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) =>
                            updateArrayField(
                              "technologies",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder={`Technology ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.technologies.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayField("technologies", index)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("technologies")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Technology
                    </button>
                  </div>{" "}
                  {/* Project Images Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Images
                    </label>
                    {formData.projectImages.map((image, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) =>
                            updateArrayField(
                              "projectImages",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder={`Image URL ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.projectImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayField("projectImages", index)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("projectImages")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Image
                    </button>
                  </div>
                  {/* Key Features Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Features
                    </label>
                    {formData.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            updateArrayField(
                              "keyFeatures",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder={`Feature ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.keyFeatures.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayField("keyFeatures", index)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("keyFeatures")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Feature
                    </button>
                  </div>
                  {/* Challenges Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Challenges
                    </label>
                    {formData.challenges.map((challenge, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={challenge}
                          onChange={(e) =>
                            updateArrayField(
                              "challenges",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder={`Challenge ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.challenges.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayField("challenges", index)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("challenges")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Challenge
                    </button>
                  </div>
                  {/* Solutions Array */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Solutions
                    </label>
                    {formData.solutions.map((solution, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={solution}
                          onChange={(e) =>
                            updateArrayField("solutions", index, e.target.value)
                          }
                          placeholder={`Solution ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formData.solutions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField("solutions", index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("solutions")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Solution
                    </button>
                  </div>{" "}
                  <div className="md:col-span-2 flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isShowcase}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isShowcase: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Showcase Project
                      </span>
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
                    {editingProject ? "Update Project" : "Create Project"}
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

export default FreelanceProjectsManager;
