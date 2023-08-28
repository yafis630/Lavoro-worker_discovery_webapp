import axios from "axios";
import React, { useContext, useEffect } from "react";

import { Dropdown } from "semantic-ui-react";

import AuthContext from "../context/AuthProvider";

import Logout from "./Logout";
import ActionModal from "./Modal";
import ProfilePictureForm from "./ProfilePictureForm";
import PasswordChangeForm from "./PasswordChangeForm";
import BioChangeForm from "./BioChangeForm";

const WorkerHome = () => {
  const { auth } = useContext(AuthContext);

  const [checked, setChecked] = React.useState(false);
  const [fullName, setFullName] = React.useState("");

  useEffect(() => {
    axios
      .get("/workers/home", {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((response) => {
        setFullName(response.data.fullName);
        setChecked(response.data.available);
      });
  });
  console.log(checked);

  const handleChange = async () => {
    const res = await axios.put(
      "/workers/availability",
      { checked: !checked },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );
    if (res.data) {
      setChecked(!checked);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h3 className="name-heading">
        Hello, {fullName.split(" ")[0]}!
        <Dropdown inline options={[<Logout />]} />
      </h3>
      <div className="ui inverted compact segment">
        <h3>Visibility is {checked ? "on." : "off."}</h3>
        <div className="ui inverted fitted toggle checkbox">
          <button onClick={handleChange}>CHANGE</button>
        </div>
      </div>
      <div>
        <ActionModal
          formToDisplay={ProfilePictureForm}
          type="Update Profile Picture"
        />
        <ActionModal type="Change Bio" formToDisplay={BioChangeForm} />

        <ActionModal
          type="Change Password"
          formToDisplay={PasswordChangeForm}
        />
        <br />
      </div>
    </div>
  );
};

export default WorkerHome;
