// src/services/programService.js
// Frontend-only mock — no Firebase. In-memory store seeded from src/data/programs.js.

import { mockPrograms } from "../data/programs.js";

// In-memory store (mutations survive component re-renders but reset on page reload)
let programs = mockPrograms.map((p) => ({ ...p }));

let _nextId = 100;

/**
 * Real-time style listener — calls callback immediately with current data.
 * Returns a noop unsubscribe function.
 */
export const subscribeToPrograms = (callback, _onError) => {
    Promise.resolve().then(() => callback([...programs]));
    return () => { };
};

/**
 * Get a single program by ID.
 */
export const getProgram = async (id) => {
    const prog = programs.find((p) => p.id === id);
    if (!prog) throw new Error("Program not found");
    return { ...prog };
};

/**
 * Get all programs once.
 */
export const getAllPrograms = async () => [...programs];

/**
 * Create a new program (admin only).
 */
export const createProgram = async (data) => {
    const newProg = {
        ...data,
        id: `prog-${++_nextId}`,
        bookingsCount: 0,
        createdAt: new Date().toISOString(),
    };
    programs = [newProg, ...programs];
    return newProg.id;
};

/**
 * Update an existing program (admin only).
 */
export const updateProgram = async (id, data) => {
    programs = programs.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    );
};

/**
 * Delete a program (admin only).
 */
export const deleteProgram = async (id) => {
    programs = programs.filter((p) => p.id !== id);
};
