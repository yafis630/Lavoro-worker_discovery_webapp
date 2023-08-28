import React, { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../context/AuthProvider";

const ProfilePictureForm = () => {
  const { auth } = useContext(AuthContext);

  const [avatar, setAvatar] = useState("");

  const handleFile = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);

    if (avatar) {
      const response = await axios.put("/workers/avatar", formData, {
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) window.location.reload();
      else alert("Operation failed!");
    } else alert("Select a picture!");
  };
  return (
    <div className="ui inverted segment">
      <h1>Profile Picture</h1>
      <div className="ui inverted form">
        <form onSubmit={handleSubmit}>
          <div className="one field">
            <div className="field">
              <label>Location</label>
              <input type="file" name="avatar" onChange={handleFile} />
            </div>
          </div>

          <input className="ui submit button" type="submit" value="Upload" />
        </form>
      </div>
    </div>
  );
};

export default ProfilePictureForm;
