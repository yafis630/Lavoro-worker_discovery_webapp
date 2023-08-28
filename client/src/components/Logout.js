import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth, setIsAuth, auth } = useContext(AuthContext);
  const handleLogout = async () => {
    const res = await axios.delete("/logout", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });

    if (res.data) {
      setAuth({});
      setIsAuth(false);
      localStorage.clear();

      navigate("/");
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
