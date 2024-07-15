import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ?  setIsAuthenticated(true) :  navigate("/login")
    setLoading(false);

  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{isAuthenticated ? <div>{children}</div> : null}</div>;
};

export default PrivateRoute;
