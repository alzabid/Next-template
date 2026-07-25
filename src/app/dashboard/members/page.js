"use client";
import { useState, useEffect, useRef } from "react";
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  uploadToImageBB,
  getSetting,
  updateSetting,
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
  Users,
  User,
  Building2,
  Mail,
  Upload,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

const getCurrentTermYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 is January, 5 is June
  // If we are before June, the term is from the previous year
  if (month < 5) {
    return year - 1;
  }
  return year;
};

const generateTerms = () => {
  const currentTermYear = getCurrentTermYear();
  const terms = [];
  // Generate 15 years back up to the next upcoming term
  for (let i = currentTermYear - 15; i <= currentTermYear + 1; i++) {
    terms.push(`${i}-${(i + 1).toString().slice(2)}`);
  }
  return terms.reverse();
};

const DEFAULT_TERM = `${getCurrentTermYear()}-${(getCurrentTermYear() + 1).toString().slice(2)}`;

export default function MemberManagement() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deletePdfModal, setDeletePdfModal] = useState(null);
  const [deletingPdf, setDeletingPdf] = useState(false);
  const [uploadPdfModal, setUploadPdfModal] = useState(false);
  const [pendingPdfFile, setPendingPdfFile] = useState(null);
  const [pdfTitle, setPdfTitle] = useState("");
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
    year: DEFAULT_TERM,
    category: "MEMBER",
  });
  const [saving, setSaving] = useState(false);
  const [pdfList, setPdfList] = useState([]);
  const [loadingPdfId, setLoadingPdfId] = useState(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const pdfInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchItems();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getSetting("members_pdf_list");
      if (res.data && res.data.value) {
        setPdfList(JSON.parse(res.data.value));
      } else {
        const legacyRes = await getSetting("members_pdf");
        if (legacyRes.data && legacyRes.data.value) {
           const legacyPdf = {
             id: "legacy",
             name: "Legacy Members List.pdf",
             size: legacyRes.data.value.length * 0.75,
             uploadedAt: new Date().toISOString()
           };
           setPdfList([legacyPdf]);
           await updateSetting("members_pdf_list", JSON.stringify([legacyPdf]));
           await updateSetting("members_pdf_legacy", legacyRes.data.value);
        }
      }
    } catch {}
  };

  const handleViewPdf = async (pdf) => {
    setLoadingPdfId(pdf.id);
    try {
      const fetchId = pdf.id === "legacy" ? "members_pdf_legacy" : `members_pdf_${pdf.id}`;
      const res = await getSetting(fetchId);
      if (res.data && res.data.value) {
        const a = document.createElement("a");
        a.href = res.data.value;
        a.download = pdf.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        showToast("PDF data not found", "error");
      }
    } catch (error) {
      showToast("Failed to load PDF", "error");
    } finally {
      setLoadingPdfId(null);
    }
  };

  const handleDeletePdf = async (id) => {
    setDeletingPdf(true);
    try {
      const updatedList = pdfList.filter((p) => p.id !== id);
      await updateSetting("members_pdf_list", JSON.stringify(updatedList));
      setPdfList(updatedList);
      showToast("PDF deleted successfully", "success");
      
      const fetchId = id === "legacy" ? "members_pdf_legacy" : `members_pdf_${id}`;
      await updateSetting(fetchId, "");
    } catch (error) {
      showToast("Failed to delete PDF", "error");
    } finally {
      setDeletingPdf(false);
      setDeletePdfModal(null);
    }
  };

  useEffect(() => {
    let result = items;
    if (filterCategory !== "ALL") {
      result = result.filter((item) => item.category === filterCategory);
    }
    if (search.trim()) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()),
      );
    }
    setFilteredItems(result);
  }, [search, items, filterCategory]);

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
      year: DEFAULT_TERM,
      category: "MEMBER",
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
      year: member.year || DEFAULT_TERM,
      category: member.category || "MEMBER",
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

    if (file.size > 20 * 1024 * 1024) {
      showToast("Image size should be less than 20MB", "error");
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

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      showToast("Please select a PDF file", "error");
      if (pdfInputRef.current) pdfInputRef.current.value = "";
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      showToast("PDF size should be less than 50MB", "error");
      if (pdfInputRef.current) pdfInputRef.current.value = "";
      return;
    }

    setPendingPdfFile(file);
    setPdfTitle(file.name.replace(/\.[^/.]+$/, ""));
    setUploadPdfModal(true);
  };

  const confirmPdfUpload = async () => {
    if (!pendingPdfFile || !pdfTitle.trim()) {
      showToast("Please provide a title", "error");
      return;
    }
    
    setUploadingPdf(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        const newId = Date.now().toString() + Math.random().toString(36).substring(7);
        const newPdf = {
          id: newId,
          name: pdfTitle.trim(),
          size: pendingPdfFile.size,
          uploadedAt: new Date().toISOString()
        };
        
        await updateSetting(`members_pdf_${newId}`, base64String);
        
        setPdfList((prev) => {
          const updatedList = [newPdf, ...prev];
          updateSetting("members_pdf_list", JSON.stringify(updatedList)).catch(() => {});
          return updatedList;
        });
        
        showToast("Document uploaded successfully", "success");
        setUploadingPdf(false);
        setUploadPdfModal(false);
        setPendingPdfFile(null);
        setPdfTitle("");
        if (pdfInputRef.current) pdfInputRef.current.value = "";
      };
      reader.readAsDataURL(pendingPdfFile);
    } catch (error) {
      showToast("Failed to upload PDF", "error");
      setUploadingPdf(false);
    }
  };

  const cancelPdfUpload = () => {
    setUploadPdfModal(false);
    setPendingPdfFile(null);
    setPdfTitle("");
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  const handleSave = async () => {
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
        "error",
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

      {/* Delete PDF Modal */}
      {deletePdfModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Delete Document
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Are you sure you want to delete &quot;{deletePdfModal.name}&quot;?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletePdfModal(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePdf(deletePdfModal.id)}
                  disabled={deletingPdf}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {deletingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload PDF Modal */}
      {uploadPdfModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" style={{ animation: "fadeIn 0.2s ease-out" }}>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Document Title
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                Please enter a title for the document you are about to upload.
              </p>
              
              <div className="mb-6 text-left">
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  placeholder="Enter document title"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelPdfUpload}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPdfUpload}
                  disabled={uploadingPdf}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploadingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  Upload
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
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${formData.image ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
                    >
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
                    Name
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
                    Email
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
                    Title (English)
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
                    Department
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
                    Year / Term
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
                  >
                    {generateTerms().map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
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
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
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
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={pdfInputRef}
            onChange={handlePdfUpload}
            accept="application/pdf"
            className="hidden"
          />
          <button
            onClick={() => pdfInputRef.current?.click()}
            disabled={uploadingPdf}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm text-sm disabled:opacity-50"
          >
            {uploadingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Upload Document
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20 text-sm"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
        </div>
      </div>

      {/* Member Documents Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Member Documents</h2>
            <p className="text-sm text-slate-500">Manage uploaded PDF lists and resources.</p>
          </div>
        </div>
        {pdfList.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Uploaded At</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pdfList.map((pdf) => (
                  <tr key={pdf.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="font-medium text-slate-700">{pdf.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {(pdf.size / (1024 * 1024)).toFixed(2)} MB
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(pdf.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewPdf(pdf)}
                          disabled={loadingPdfId === pdf.id}
                          className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {loadingPdfId === pdf.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Search className="w-3.5 h-3.5" />
                          )}
                          View
                        </button>
                        <button
                          onClick={() => setDeletePdfModal(pdf)}
                          className="px-3 py-1.5 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
                        >
                          Delete
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

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
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
          <div className="w-full sm:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 transition-all"
            >
              <option value="ALL">All Categories</option>
              <option value="EXECUTIVE">Executives</option>
              <option value="MEMBER">Members</option>
            </select>
          </div>
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
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
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
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${item.category === "EXECUTIVE" ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
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
