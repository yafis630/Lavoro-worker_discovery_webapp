import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import validateEmail from "../helpers/emailValidation";
import phoneNumberValidate from "../helpers/phoneNumberValidate";

import AuthContext from "../context/AuthProvider";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const useOnFormSubmit = async (event) => {
    event.preventDefault();
    if (
      (validateEmail(login) || phoneNumberValidate(login)) &&
      password.length >= 8
    ) {
      const response = await axios.post(
        "/users/login",
        { login, password },
        {}
      );

      if (!response.data) {
        alert("Invalid credentials!");
      } else {
        const accessToken = response.data.accessToken;
        setAuth(accessToken);
        setIsAuth(true);

        navigate("/users/home");
      }
    } else alert("Invalid credentials!");
  };
  return (
    <div className="ui inverted segment">
      <h1>User Login</h1>
      <div className="ui inverted form">
        <form onSubmit={useOnFormSubmit}>
          <div className="one field">
            <div className="field">
              <label>Email</label>
              <input
                placeholder="Email/Phone number"
                type="text"
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
                value={login}
              />
            </div>

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
          </div>

          <input className="ui submit button" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
