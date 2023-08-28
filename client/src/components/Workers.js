import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../context/AuthProvider";

const Workers = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`/workers/${category}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      .then((response) => {
        setWorkerList(
          response.data.map((worker, i) => (
            <li className="worker-details" key={i}>
              <img
                className="worker-picture-list"
                src={`/workers/avatar/${worker.email}`}
                alt="profile"
              />
              <h3>Name</h3>
              <p>{worker.fullName}</p>
              <h3>Email</h3>
              <p>{worker.email}</p>
              <h3>Phone Number</h3>
              <p>{worker.phoneNumber}</p>
              <h3>Bio</h3>
              <p>{worker.bio}</p>
            </li>
          ))
        );
      });
  }, []);

  return (
    <div>
      <br />
      <h2 className="worker-type">{category}s</h2>
      <ul>{workerList}</ul>
    </div>
  );
};

export default Workers;
