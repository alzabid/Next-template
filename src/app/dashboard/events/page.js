"use client";
import { useState, useEffect } from "react";
import {
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/lib/api";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Calendar,
  Save,
  Eye,
  EyeOff,
  MapPin,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const EMPTY_FORM = {
  title: "",
  slug: "",
  bannerImage: "",
  greeting: "",
  bodyText: "",
  closingText: "",
  eventDate: "",
  venue: "",
  venueAddress: "",
  schedule: [],
  contactPersons: [],
  featuredTitle: "",
  featuredSubtitle: "",
  featuredDescription: "",
  featuredImage: "",
  featuredItems: [],
  featuredHighlightTitle: "",
  featuredHighlightText: "",
  ctaTitle: "",
  ctaSubtitle: "",
  ctaButtonText: "",
  organizationName: "",
  isPublished: false,
};

export default function EventManagement() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const [formModal, setFormModal] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    content: false,
    schedule: false,
    contacts: false,
    featured: false,
    cta: false,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      setFilteredItems(
        items.filter(
          (item) =>
            (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (item.slug || "").toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [search, items]);

  const fetchItems = async () => {
    try {
      const res = await getAdminEvents();
      setItems(res.data || []);
    } catch {
      showToast("Failed to load events", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteEvent(id);
      await fetchItems();
      showToast("Event deleted successfully", "success");
    } catch {
      showToast("Failed to delete event", "error");
    } finally {
      setDeleting(false);
      setDeleteModal(null);
    }
  };

  const openCreateModal = () => {
    setFormData({ ...EMPTY_FORM });
    setExpandedSections({
      basic: true,
      content: false,
      schedule: false,
      contacts: false,
      featured: false,
      cta: false,
    });
    setFormModal({ mode: "create" });
  };

  const openEditModal = (event) => {
    setFormData({
      title: event.title || "",
      slug: event.slug || "",
      bannerImage: event.bannerImage || "",
      greeting: event.greeting || "",
      bodyText: event.bodyText || "",
      closingText: event.closingText || "",
      eventDate: event.eventDate || "",
      venue: event.venue || "",
      venueAddress: event.venueAddress || "",
      schedule: event.schedule || [],
      contactPersons: event.contactPersons || [],
      featuredTitle: event.featuredTitle || "",
      featuredSubtitle: event.featuredSubtitle || "",
      featuredDescription: event.featuredDescription || "",
      featuredImage: event.featuredImage || "",
      featuredItems: event.featuredItems || [],
      featuredHighlightTitle: event.featuredHighlightTitle || "",
      featuredHighlightText: event.featuredHighlightText || "",
      ctaTitle: event.ctaTitle || "",
      ctaSubtitle: event.ctaSubtitle || "",
      ctaButtonText: event.ctaButtonText || "",
      organizationName: event.organizationName || "",
      isPublished: event.isPublished || false,
    });
    setExpandedSections({
      basic: true,
      content: false,
      schedule: false,
      contacts: false,
      featured: false,
      cta: false,
    });
    setFormModal({ mode: "edit", event });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      showToast("Title and slug are required", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = { ...formData };
      if (formModal.mode === "create") {
        await createEvent(payload);
        showToast("Event created successfully", "success");
      } else {
        await updateEvent(formModal.event.id, payload);
        showToast("Event updated successfully", "success");
      }
      await fetchItems();
      setFormModal(null);
    } catch (err) {
      showToast(
        `Failed to ${formModal.mode === "create" ? "create" : "update"} event`,
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (event) => {
    try {
      await updateEvent(event.id, { isPublished: !event.isPublished });
      await fetchItems();
      showToast(
        `Event ${event.isPublished ? "unpublished" : "published"} successfully`,
        "success"
      );
    } catch {
      showToast("Failed to update event status", "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Schedule helpers
  const addScheduleItem = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { activity: "", time: "" }],
    });
  };
  const removeScheduleItem = (idx) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== idx),
    });
  };
  const updateScheduleItem = (idx, field, value) => {
    const updated = [...formData.schedule];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, schedule: updated });
  };

  // Contact helpers
  const addContactPerson = () => {
    setFormData({
      ...formData,
      contactPersons: [
        ...formData.contactPersons,
        { name: "", designation: "", mobile: "" },
      ],
    });
  };
  const removeContactPerson = (idx) => {
    setFormData({
      ...formData,
      contactPersons: formData.contactPersons.filter((_, i) => i !== idx),
    });
  };
  const updateContactPerson = (idx, field, value) => {
    const updated = [...formData.contactPersons];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, contactPersons: updated });
  };

  // Featured items helpers
  const addFeaturedItem = () => {
    setFormData({
      ...formData,
      featuredItems: [
        ...formData.featuredItems,
        { title: "", description: "" },
      ],
    });
  };
  const removeFeaturedItem = (idx) => {
    setFormData({
      ...formData,
      featuredItems: formData.featuredItems.filter((_, i) => i !== idx),
    });
  };
  const updateFeaturedItem = (idx, field, value) => {
    const updated = [...formData.featuredItems];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, featuredItems: updated });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const SectionHeader = ({ title, section, icon: Icon }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
    >
      <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
        <Icon className="w-4 h-4 text-blue-500" />
        {title}
      </span>
      {expandedSections[section] ? (
        <ChevronUp className="w-4 h-4 text-slate-400" />
      ) : (
        <ChevronDown className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );

  const inputClass =
    "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1.5";

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium transition-all ${
            toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Delete Event
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Are you sure you want to delete &quot;{deleteModal.title}&quot;?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.id)}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {deleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {formModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            style={{ animation: "fadeIn 0.2s ease-out" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  {formModal.mode === "create" ? (
                    <Plus className="w-5 h-5 text-white" />
                  ) : (
                    <Edit2 className="w-5 h-5 text-white" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {formModal.mode === "create"
                    ? "Create New Event"
                    : "Edit Event"}
                </h3>
              </div>
              <button
                onClick={() => setFormModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (scrollable) */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Basic Info */}
              <SectionHeader
                title="Basic Information"
                section="basic"
                icon={Calendar}
              />
              {expandedSections.basic && (
                <div className="space-y-4 px-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Event Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setFormData({
                            ...formData,
                            title,
                            slug:
                              formModal.mode === "create"
                                ? generateSlug(title)
                                : formData.slug,
                          });
                        }}
                        placeholder="Enter event title..."
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Slug *</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        placeholder="event-slug"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Banner Image URL</label>
                    <input
                      type="text"
                      value={formData.bannerImage}
                      onChange={(e) =>
                        setFormData({ ...formData, bannerImage: e.target.value })
                      }
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Event Date</label>
                      <input
                        type="text"
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({ ...formData, eventDate: e.target.value })
                        }
                        placeholder="e.g. ০৭ ফেব্রুয়ারি ২০২৬"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Venue</label>
                      <input
                        type="text"
                        value={formData.venue}
                        onChange={(e) =>
                          setFormData({ ...formData, venue: e.target.value })
                        }
                        placeholder="Venue name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Venue Address</label>
                      <input
                        type="text"
                        value={formData.venueAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            venueAddress: e.target.value,
                          })
                        }
                        placeholder="City, Country"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Organization Name</label>
                    <input
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organizationName: e.target.value,
                        })
                      }
                      placeholder="Organization name"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPublished: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span className="text-sm font-medium text-slate-700">
                      {formData.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <SectionHeader
                title="Content (Body Text)"
                section="content"
                icon={Edit2}
              />
              {expandedSections.content && (
                <div className="space-y-4 px-2">
                  <div>
                    <label className={labelClass}>Greeting</label>
                    <textarea
                      value={formData.greeting}
                      onChange={(e) =>
                        setFormData({ ...formData, greeting: e.target.value })
                      }
                      placeholder="Greeting text..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Body Text</label>
                    <textarea
                      value={formData.bodyText}
                      onChange={(e) =>
                        setFormData({ ...formData, bodyText: e.target.value })
                      }
                      placeholder="Main content..."
                      rows={6}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Closing Text</label>
                    <input
                      type="text"
                      value={formData.closingText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          closingText: e.target.value,
                        })
                      }
                      placeholder="e.g. বিনীত,"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Schedule */}
              <SectionHeader
                title={`Schedule (${formData.schedule.length} items)`}
                section="schedule"
                icon={Calendar}
              />
              {expandedSections.schedule && (
                <div className="space-y-3 px-2">
                  {formData.schedule.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <input
                        type="text"
                        value={item.activity}
                        onChange={(e) =>
                          updateScheduleItem(idx, "activity", e.target.value)
                        }
                        placeholder="Activity"
                        className={`${inputClass} flex-1`}
                      />
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) =>
                          updateScheduleItem(idx, "time", e.target.value)
                        }
                        placeholder="Time"
                        className={`${inputClass} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={() => removeScheduleItem(idx)}
                        className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addScheduleItem}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Add Schedule Item
                  </button>
                </div>
              )}

              {/* Contact Persons */}
              <SectionHeader
                title={`Contact Persons (${formData.contactPersons.length})`}
                section="contacts"
                icon={MapPin}
              />
              {expandedSections.contacts && (
                <div className="space-y-3 px-2">
                  {formData.contactPersons.map((person, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl space-y-2"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={person.name}
                          onChange={(e) =>
                            updateContactPerson(idx, "name", e.target.value)
                          }
                          placeholder="Name"
                          className={`${inputClass} flex-1`}
                        />
                        <button
                          type="button"
                          onClick={() => removeContactPerson(idx)}
                          className="p-2 text-red-400 hover:text-red-600 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={person.designation}
                          onChange={(e) =>
                            updateContactPerson(
                              idx,
                              "designation",
                              e.target.value
                            )
                          }
                          placeholder="Designation"
                          className={`${inputClass} flex-1`}
                        />
                        <input
                          type="text"
                          value={person.mobile}
                          onChange={(e) =>
                            updateContactPerson(idx, "mobile", e.target.value)
                          }
                          placeholder="Mobile"
                          className={`${inputClass} flex-1`}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addContactPerson}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Add Contact Person
                  </button>
                </div>
              )}

              {/* Featured Section */}
              <SectionHeader
                title="Featured Section"
                section="featured"
                icon={Eye}
              />
              {expandedSections.featured && (
                <div className="space-y-4 px-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Featured Title</label>
                      <input
                        type="text"
                        value={formData.featuredTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredTitle: e.target.value,
                          })
                        }
                        placeholder="e.g. Lucky Draw & Lottery"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Featured Subtitle</label>
                      <input
                        type="text"
                        value={formData.featuredSubtitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredSubtitle: e.target.value,
                          })
                        }
                        placeholder="e.g. Special Program"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Featured Description</label>
                    <textarea
                      value={formData.featuredDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredDescription: e.target.value,
                        })
                      }
                      placeholder="Description..."
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Featured Image URL</label>
                    <input
                      type="text"
                      value={formData.featuredImage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredImage: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </div>
                  {/* Featured Items */}
                  <div>
                    <label className={labelClass}>Featured Items</label>
                    {formData.featuredItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            updateFeaturedItem(idx, "title", e.target.value)
                          }
                          placeholder="Item title"
                          className={`${inputClass} flex-1`}
                        />
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateFeaturedItem(
                              idx,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Item description"
                          className={`${inputClass} flex-1`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeaturedItem(idx)}
                          className="p-2 text-red-400 hover:text-red-600 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeaturedItem}
                      className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium bg-blue-50 px-3 py-2 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Highlight Title</label>
                      <input
                        type="text"
                        value={formData.featuredHighlightTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredHighlightTitle: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Highlight Text</label>
                      <input
                        type="text"
                        value={formData.featuredHighlightText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredHighlightText: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <SectionHeader
                title="Call to Action"
                section="cta"
                icon={LinkIcon}
              />
              {expandedSections.cta && (
                <div className="space-y-4 px-2">
                  <div>
                    <label className={labelClass}>CTA Title</label>
                    <input
                      type="text"
                      value={formData.ctaTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, ctaTitle: e.target.value })
                      }
                      placeholder="e.g. Ready to Join Us?"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>CTA Subtitle</label>
                    <input
                      type="text"
                      value={formData.ctaSubtitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ctaSubtitle: e.target.value,
                        })
                      }
                      placeholder="Register now..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>CTA Button Text</label>
                    <input
                      type="text"
                      value={formData.ctaButtonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ctaButtonText: e.target.value,
                        })
                      }
                      placeholder="e.g. Register Now"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50 flex-shrink-0">
              <button
                onClick={() => setFormModal(null)}
                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {formModal.mode === "create" ? "Create Event" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Event Management
          </h1>
          <p className="text-slate-500 mt-1">
            Create, edit, and manage events — keep your audience informed.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 text-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Event
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by title or slug..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {filteredItems.length} event{filteredItems.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading events...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-16 text-center">
            <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              {search ? "No events match your search" : "No events yet"}
            </h3>
            <p className="text-slate-400 mb-6">
              {search
                ? "Try a different search term"
                : "Start by creating your first event"}
            </p>
            {!search && (
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Create Your First Event
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            {item.bannerImage ? (
                              <img
                                src={item.bannerImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-blue-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate max-w-xs">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              /{item.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {item.eventDate || formatDate(item.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(item)}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                            item.isPublished
                              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {item.isPublished ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          {item.isPublished ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {item.isPublished && item.slug && (
                            <Link
                              href={`/news/events/${item.slug}`}
                              target="_blank"
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteModal(item)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      {item.bannerImage ? (
                        <img
                          src={item.bannerImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        /{item.slug}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {item.eventDate || formatDate(item.createdAt)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                            item.isPublished
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => openEditModal(item)}
                          className="flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-lg"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => togglePublish(item)}
                          className="flex items-center gap-1 text-xs text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg"
                        >
                          {item.isPublished ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                          {item.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => setDeleteModal(item)}
                          className="flex items-center gap-1 text-xs text-red-500 font-medium bg-red-50 px-3 py-1.5 rounded-lg"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
