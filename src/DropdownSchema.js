import React, { useState } from "react";
import "./App.css";
import {BsDashLg} from "react-icons/bs"

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function SchemaDropdown(props) {
  const [selectedOption, setSelectedOption] = useState("");

  function handleAddClick() {
    props.onAdd(selectedOption);
    setSelectedOption("");
  }

  function handleRemoveClick(index) {
    props.onRemove(index);
  }
  const options = schemaOptions.filter(
    (option) => !props.selectedOptions.includes(option.value)
  );

  return (
    <div className="container">
      {props.selectedOptions.map((option, index) => (
        <div className="selected_segment" key={index}>
          {/* <span>{schemaOptions.find(o => o.value === option).label}</span> */}
          <select className="box_field">
            <option>
              {schemaOptions.find((o) => o.value === option).label}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button className="remove_btn" onClick={() => handleRemoveClick(index)}><BsDashLg/></button>
        </div>
      ))}
      <select
        className="select_field"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Add schema to segment</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button className="schema_add_btn" onClick={handleAddClick}>
        + Add new schema
      </button>
    </div>
  );
}

export default SchemaDropdown;
