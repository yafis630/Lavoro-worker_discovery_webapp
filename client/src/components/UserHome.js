import { useState, useEffect, useContext } from "react";

import { Dropdown } from "semantic-ui-react";

import axios from "axios";

import ActionModal from "./Modal";

import AuthContext from "../context/AuthProvider";

import workerCategories from "../data/workerCategories";

import CategoryHolder from "./CategoryHolder";
import Logout from "./Logout";
import PasswordChangeUserForm from "./PasswordChangeUserForm";

const workers = workerCategories.map((category, i) => (
  <li className="category-list" key={i}>
    <CategoryHolder name={category} />
  </li>
));

const UserHome = () => {
  const { auth } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    axios
      .get("/users/home", {
        headers: { Authorization: `Bearer ${auth}` },
      })
      .then((response) => {
        setFullName(response.data.fullName);
      });
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h3 className="name-heading">
        Hello, {fullName.split(" ")[0]}!
        <Dropdown inline options={[<Logout />]} />
      </h3>
      <ActionModal
        type="Change Password"
        formToDisplay={PasswordChangeUserForm}
      />
      <h1 className="name-heading"> Who do you wanna hire?</h1>
      <ul>{workers}</ul>
    </div>
  );
};

export default UserHome;
