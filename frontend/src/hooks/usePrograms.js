// src/hooks/usePrograms.js
// Frontend-only: loads programs from mock service (no Firestore listener)
import { useState, useEffect } from "react";
import { getAllPrograms } from "../services/programService";

export const usePrograms = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getAllPrograms()
            .then((data) => {
                setPrograms(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { programs, loading, error };
};
