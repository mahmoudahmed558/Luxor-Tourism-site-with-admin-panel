// src/services/bookingService.js
// Frontend-only mock — no Firebase. In-memory store seeded from src/data/bookings.js.

import seedBookings from "../data/bookings.js";

// In-memory store
let bookings = seedBookings.map((b) => ({ ...b }));

let _nextId = 100;

/**
 * Create a new booking (tourist).
 */
export const createBooking = async ({ userId, programId, programTitle, participants, totalPrice, passengerName, phone }) => {
    const newBooking = {
        id: `book-${++_nextId}`,
        userId,
        programId,
        programTitle,
        passengerName: passengerName || "—",
        phone: phone || "",
        participants,
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
    };
    bookings = [newBooking, ...bookings];
    return newBooking.id;
};

/**
 * Real-time listener for a specific tourist's bookings.
 */
export const subscribeToUserBookings = (userId, callback, _onError) => {
    const userBookings = bookings.filter((b) => b.userId === userId);
    Promise.resolve().then(() => callback(userBookings));
    return () => { };
};

/**
 * Real-time listener for ALL bookings (admin).
 */
export const subscribeToAllBookings = (callback, _onError) => {
    Promise.resolve().then(() => callback([...bookings]));
    return () => { };
};

/**
 * Update booking status (admin only).
 */
export const updateBookingStatus = async (bookingId, status) => {
    bookings = bookings.map((b) =>
        b.id === bookingId ? { ...b, status } : b
    );
};

/**
 * Get all bookings once (admin).
 */
export const getAllBookings = async () => [...bookings];
