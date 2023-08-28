import React, { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../context/AuthProvider";

const PasswordChangeForm = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { auth } = useContext(AuthContext);
  const useOnFormSubmit = async (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      const response = await axios.put(
        `/workers/password`,
        { password, newPassword },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (!response.data) {
        alert("Invalid credentials!");
      } else {
        alert("Success!");
      }
    } else alert("Invalid credentials!");
  };
  return (
    <div className="ui inverted segment">
      <h1>Password Change</h1>
      <div className="ui inverted form">
        <form onSubmit={useOnFormSubmit}>
          <div className="one field">
            <div className="field">
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>

            <div className="field">
              <label>New Password</label>
              <input
                placeholder="New Password"
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                value={newPassword}
              />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
            </div>
          </div>

          <input className="ui submit button" type="submit" value="Change" />
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
