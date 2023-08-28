import React, { useContext } from "react";

import ActionModal from "./Modal";
import LoginForm from "./LoginForm";
import LoginWorkerForm from "./LoginWorkerForm";
import UserRegisterForm from "./UserRegisterForm";
import WorkerRegisterForm from "./WorkerRegisterForm";

import AuthContext from "../context/AuthProvider";

const Home = () => {
  const { isAuth } = useContext(AuthContext);
  const stringToBoolean = (boolInString) => {
    if (typeof boolInString === "boolean") return boolInString;
    if (boolInString === "true") return true;
    else return false;
  };

  return (
    <div className="buttons-container">
      {!stringToBoolean(isAuth) ? (
        <div>
          <ActionModal type="Log in as User" formToDisplay={LoginForm} />
          <ActionModal
            type="Log in as Worker"
            formToDisplay={LoginWorkerForm}
          />
          <ActionModal
            type="Register as User"
            formToDisplay={UserRegisterForm}
          />
          <ActionModal
            type="Register as Worker"
            formToDisplay={WorkerRegisterForm}
          />
        </div>
      ) : null}

      <div className="main-text-holder">
        <h3 className="ui header main-title">
          A meeting place for workers and employers.
        </h3>
      </div>
    </div>
  );
};

export default Home;
