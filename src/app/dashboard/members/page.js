"use client";
import { useState, useEffect, useRef } from "react";
import { getMembers, createMember, updateMember, deleteMember, uploadToImageBB } from "@/lib/api";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Users,
  User,
  Building2,
  Mail,
  Upload,
  Image as ImageIcon
} from "lucide-react";

export default function MemberManagement() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  
  // form modal state
  const [formModal, setFormModal] = useState(null); // { mode: 'create' | 'edit', member?: {...} }
  const [formData, setFormData] = useState({
    name: "",
    titleEn: "",
    titleBn: "",
    department: "",
    email: "",
    phone: "",
    image: "",
    year: "2025-26",
    category: "MEMBER"
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) || 
          item.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [search, items]);

  const fetchItems = async () => {
    try {
      const res = await getMembers();
      setItems(res.data || []);
    } catch {
      showToast("Failed to load members", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteMember(id);
      await fetchItems();
      showToast("Member deleted successfully", "success");
    } catch {
      showToast("Failed to delete member", "error");
    } finally {
      setDeleting(false);
      setDeleteModal(null);
    }
  };

  const openCreateModal = () => {
    setFormData({
      name: "",
      titleEn: "",
      titleBn: "",
      department: "",
      email: "",
      phone: "",
      image: "",
      year: "2025-26",
      category: "MEMBER"
    });
    setFormModal({ mode: "create" });
  };

  const openEditModal = (member) => {
    setFormData({
      name: member.name || "",
      titleEn: member.titleEn || "",
      titleBn: member.titleBn || "",
      department: member.department || "",
      email: member.email || "",
      phone: member.phone || "",
      image: member.image || "",
      year: member.year || "2025-26",
      category: member.category || "MEMBER"
    });
    setFormModal({ mode: "edit", member });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size should be less than 5MB", "error");
      return;
    }

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToImageBB(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      showToast("Image uploaded successfully", "success");
    } catch (error) {
      showToast("Failed to upload image", "error");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.titleEn.trim() || !formData.department.trim()) {
      showToast("Name, English Title, Department, and Email are required", "error");
      return;
    }

    setSaving(true);
    try {
      if (formModal.mode === "create") {
        await createMember(formData);
        showToast("Member created successfully", "success");
      } else {
        await updateMember(formModal.member.id, formData);
        showToast("Member updated successfully", "success");
      }
      await fetchItems();
      setFormModal(null);
    } catch {
      showToast(
        `Failed to ${formModal.mode === "create" ? "create" : "update"} member`,
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
                Delete Member
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Are you sure you want to delete &quot;{deleteModal.name}&quot;?
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8"
            style={{ animation: "fadeIn 0.2s ease-out" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
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
                    ? "Add New Member"
                    : "Edit Member"}
                </h3>
              </div>
              <button
                onClick={() => setFormModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center relative">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-slate-300" />
                    )}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${formData.image ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                      {uploadingImage ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Upload className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadingImage}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) =>
                      setFormData({ ...formData, titleEn: e.target.value })
                    }
                    placeholder="e.g. President, Medical Officer"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={(e) =>
                      setFormData({ ...formData, titleBn: e.target.value })
                    }
                    placeholder="e.g. সভাপতি"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    placeholder="e.g. Atomic Energy Centre"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Year / Term *
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    placeholder="e.g. 2025-26 or 2024"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  >
                    <option value="EXECUTIVE">Executive</option>
                    <option value="MEMBER">Member</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50 sticky bottom-0">
              <button
                onClick={() => setFormModal(null)}
                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploadingImage}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                {formModal.mode === "create" ? "Save Member" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Members & Executives
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your organization's members and executive committee.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Member
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
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
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
          {filteredItems.length} member{filteredItems.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading members...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-16 text-center">
            <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              {search ? "No members match your search" : "No members yet"}
            </h3>
            <p className="text-slate-400 mb-6">
              {search
                ? "Try a different search term"
                : "Start by creating your first member profile"}
            </p>
            {!search && (
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Role & Dept
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Category/Year
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
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" /> {item.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {item.titleEn}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" /> {item.department}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${item.category === 'EXECUTIVE' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {item.category}
                      </span>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        Year: {item.year}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
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
        )}
      </div>
    </div>
  );
}
