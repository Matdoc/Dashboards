import React from "react";
import { useParams, Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { userId } = useParams(); // Extract userId from the URL

    // Check if the token exists for the given userId
    const token = localStorage.getItem(`token_${userId}`);

    if (!token) {
        // Redirect to login if no token is found
        return <Navigate to="/signin" replace />;
    }

    // Token exists, render child components
    return children;
};

export default Protected;