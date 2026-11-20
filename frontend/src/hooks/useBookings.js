// src/hooks/useBookings.js
// Frontend-only: loads bookings from mock service (no Firestore listener)
import { useState, useEffect } from "react";
import { getAllBookings } from "../services/bookingService";

/**
 * Hook for a specific tourist's own bookings.
 */
export const useUserBookings = (userId) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setBookings([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        getAllBookings()
            .then((all) => {
                setBookings(all.filter((b) => b.userId === userId));
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);

    return { bookings, loading, error };
};

/**
 * Hook for all bookings (admin).
 */
export const useAllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getAllBookings()
            .then((data) => {
                setBookings(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { bookings, loading, error };
};
