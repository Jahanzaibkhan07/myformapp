import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({type, value, onChange, disabled, placeholder,maxHeight="150px",minWidth="100px" }) => {
  return (
    <Form.Control
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      style={{ minWidth:minWidth,maxHeight:maxHeight }}

    />
  );
};

export default CustomInput;
