// src/services/authService.js
// Frontend-only mock auth — no Firebase, uses localStorage

const STORAGE_KEY = "sya7a_mock_user";

// Pre-seeded demo accounts
const MOCK_USERS = [
    { uid: "admin-001", name: "مدير النظام", email: "admin@sya7a.eg", password: "admin123", role: "admin", createdAt: "2024-01-01T00:00:00Z" },
    { uid: "tourist-001", name: "أحمد محمد", email: "ahmed@sya7a.eg", password: "tourist123", role: "tourist", createdAt: "2024-06-15T10:30:00Z" },
    { uid: "tourist-002", name: "Sara Ahmed", email: "sara@sya7a.eg", password: "tourist123", role: "tourist", createdAt: "2024-09-20T14:00:00Z" },
];

// In-memory registry so registerUser persists within the session
const runtimeUsers = [...MOCK_USERS];

/**
 * Register a new user (session-only — resets on page reload).
 */
export const registerUser = async ({ name, email, password }) => {
    const exists = runtimeUsers.find((u) => u.email === email);
    if (exists) throw Object.assign(new Error("Email already in use"), { code: "auth/email-already-in-use" });

    const newUser = { uid: `user-${Date.now()}`, name, email, password, role: "tourist", createdAt: new Date().toISOString() };
    runtimeUsers.push(newUser);

    const profile = { uid: newUser.uid, name, email, role: "tourist" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return profile;
};

/**
 * Sign in with email + password.
 */
export const loginUser = async ({ email, password }) => {
    const found = runtimeUsers.find((u) => u.email === email && u.password === password);
    if (!found) throw Object.assign(new Error("Invalid credentials"), { code: "auth/invalid-credential" });

    const profile = { uid: found.uid, displayName: found.name, name: found.name, email: found.email, role: found.role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return profile;
};

/**
 * Sign out.
 */
export const logoutUser = () => {
    localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get user profile by uid (reads from localStorage session).
 */
export const getUserProfile = async () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

/**
 * Subscribe to auth state changes.
 * Calls callback immediately with the current user, then returns a noop unsubscribe.
 */
export const subscribeToAuthChanges = (callback) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const user = raw ? JSON.parse(raw) : null;
    Promise.resolve().then(() => callback(user));
    return () => { };
};

/**
 * Get all users (admin). Returns users without passwords.
 */
export const getAllUsers = async () => {
    return runtimeUsers.map(({ password, ...rest }) => rest);
};

/**
 * Update user profile (name, email).
 */
export const updateUserProfile = async (uid, data) => {
    const idx = runtimeUsers.findIndex((u) => u.uid === uid);
    if (idx === -1) throw new Error("User not found");

    runtimeUsers[idx] = { ...runtimeUsers[idx], ...data };

    // If updating the currently logged-in user, refresh localStorage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        const current = JSON.parse(raw);
        if (current.uid === uid) {
            const updated = { ...current, ...data };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        }
    }
    return { uid, ...data };
};

/**
 * Delete a user (admin only).
 */
export const deleteUser = async (uid) => {
    const idx = runtimeUsers.findIndex((u) => u.uid === uid);
    if (idx === -1) throw new Error("User not found");
    runtimeUsers.splice(idx, 1);
};

/**
 * Update user role (admin only).
 */
export const updateUserRole = async (uid, role) => {
    const idx = runtimeUsers.findIndex((u) => u.uid === uid);
    if (idx === -1) throw new Error("User not found");
    runtimeUsers[idx].role = role;
};
