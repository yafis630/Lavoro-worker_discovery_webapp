import React, { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../context/AuthProvider";

const BioChangeForm = () => {
  const [bio, setBio] = useState("");

  const { auth } = useContext(AuthContext);
  const useOnFormSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.put(
      `/workers/bio`,
      { bio },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    if (!response.data) {
      alert("Failed!");
    } else {
      alert("Success!");
    }
  };
  return (
    <div className="ui inverted segment">
      <h1>Bio Change</h1>
      <div className="ui inverted form">
        <form onSubmit={useOnFormSubmit}>
          <div className="one field">
            <div className="field">
              <label>Bio</label>
              <textarea
                placeholder="Tell us about yourself."
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>

          <input className="ui submit button" type="submit" value="Change" />
        </form>
      </div>
    </div>
  );
};

export default BioChangeForm;
