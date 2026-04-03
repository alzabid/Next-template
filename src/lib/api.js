const API_BASE = "https://next-template-server.vercel.app/api/v1";
const IMGBB_API_KEY = "cdeef2d905fb0d2f03c64731c19f17ef";

// ─── Helper ───────────────────────────────────────────────
function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = { ...options.headers };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ─── Auth API ─────────────────────────────────────────────
export async function loginAPI(email, password) {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return data;
}

export async function registerAPI(name, email, password) {
  const data = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return data;
}

export async function getProfileAPI() {
  const data = await request("/auth/me");
  return data;
}

export async function refreshTokenAPI(refreshToken) {
  const data = await request("/auth/refresh-token", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
  return data;
}

export async function logoutAPI() {
  const data = await request("/auth/logout", { method: "POST" });
  return data;
}

// ─── Gallery API ──────────────────────────────────────────
export async function getGalleryItems() {
  const data = await request("/gallery");
  return data;
}

export async function getGalleryItem(id) {
  const data = await request(`/gallery/${id}`);
  return data;
}

export async function createGalleryItem(payload) {
  const data = await request("/gallery", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data;
}

export async function updateGalleryItem(id, payload) {
  const data = await request(`/gallery/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return data;
}

export async function deleteGalleryItem(id) {
  const data = await request(`/gallery/${id}`, {
    method: "DELETE",
  });
  return data;
}

// ─── ImageBB Upload ───────────────────────────────────────
export async function uploadToImageBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error("Image upload failed");
  }

  return data.data.display_url;
}
