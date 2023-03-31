import React, { useState } from "react";

function Dropdown() {
  const schemaOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  function handleSelectOption(option) {
    setSelectedOption(option);
  }

  const remainingOptions = schemaOptions.filter(
    (option) => option.value !== selectedOption?.value
  );

  return (
    <div>
      <label>Select an option:</label>
      <select
        value={selectedOption?.value ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          const option = schemaOptions.find((o) => o.value === value);
          handleSelectOption(option);
        }}
      >
        <option value="">Select an option</option>
        {schemaOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div>
          Remaining options:
          <ul>
            {remainingOptions.map((option) => (
              <li key={option.value}>{option.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown