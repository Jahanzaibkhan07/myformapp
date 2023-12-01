import React from "react";
import { Form } from "react-bootstrap";

const CustomSelect = ({
  value,
  onChange,
  disabled,
  options,
  placeholder = "Select",
  minWidth="100px",
  maxHeight="150px"
}) => {
  return (
    <Form.Control
      as="select"
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{ minWidth:minWidth,maxHeight:maxHeight, overflowY: "auto" }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
  );
};

export default CustomSelect;
