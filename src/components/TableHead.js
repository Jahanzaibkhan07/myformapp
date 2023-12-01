import React from "react";

const TableHead = () => {
 
  const head = [
    "Show Row",
    "Type",
    "Premium",
    "Customer",
    "Type of Training",
    "Subsistence Type",
    "Subsistence Value",
    "Start Time",
    "Finish Time",
    "Hour",
    "Break",
    "Kms Traveled",
    "Rate",
    "Km Expense",
  ];
  return (
    <thead className="my-2">
      <tr>
        {head.map((item, index) => (
          <th scope="col" key={index}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
