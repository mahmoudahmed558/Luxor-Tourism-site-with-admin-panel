// src/contexts/AuthContext.jsx
// Frontend-only mock auth context — no Firebase, no SDK imports
import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, read any saved session from localStorage
    useEffect(() => {
        getUserProfile().then((profile) => {
            if (profile) {
                setCurrentUser(profile);
                setUserProfile(profile);
            }
            setLoading(false);
        });
    }, []);

    const login = async (credentials) => {
        const profile = await loginUser(credentials);
        setCurrentUser(profile);
        setUserProfile(profile);
        return profile;
    };

    const logout = async () => {
        logoutUser();
        setCurrentUser(null);
        setUserProfile(null);
    };

    const register = async (data) => {
        const profile = await registerUser(data);
        setCurrentUser(profile);
        setUserProfile(profile);
        return profile;
    };

    const updateProfile = async (data) => {
        if (!currentUser?.uid) throw new Error("Not authenticated");
        const updated = await updateUserProfile(currentUser.uid, data);
        setCurrentUser((prev) => ({ ...prev, ...data }));
        setUserProfile((prev) => ({ ...prev, ...data }));
        return updated;
    };

    const isAdmin = userProfile?.role === "admin";
    const isTourist = userProfile?.role === "tourist";

    const value = {
        currentUser,
        userProfile,
        isAdmin,
        isTourist,
        loading,
        login,
        logout,
        register,
        updateProfile,
        role: userProfile?.role,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

