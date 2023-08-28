import React from "react";
import { Button, Modal } from "semantic-ui-react";

const ActionModal = (props) => {
  return (
    <div className="button-container">
      <Modal
        trigger={
          <Button primary className="main button ui">
            {props.type}
          </Button>
        }
        content={<props.formToDisplay />}
        size={`${
          props.type === "Log in as User" || props.type === "Log in as Worker"
            ? "mini"
            : "small"
        }`}
      />
    </div>
  );
};

export default ActionModal;
