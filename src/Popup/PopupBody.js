// import React from 'react'
// import Sample from './Sample'
// const PopupBody = () => {
//   return (
//     <div >
//         <label>Enter the Name of the Segment</label>
//         <input type='text' placeholder='Name of the segment'/>
//         <p>To save your segment you need to add the schemas to build the query </p>
//         <Sample/>
//     </div>
//   )
// }

// export default PopupBody

// import React, { useState } from "react";

// const schemaOptions = [
//   { label: "First Name", value: "first_name" },
//   { label: "Last Name", value: "last_name" },
//   { label: "Gender", value: "gender" },
//   { label: "Age", value: "age" },
//   { label: "Account Name", value: "account_name" },
//   { label: "City", value: "city" },
//   { label: "State", value: "state" }
// ];

// const SegmentSchemaForm = () => {
//   const [segmentName, setSegmentName] = useState("");
//   const [selectedSchemas, setSelectedSchemas] = useState([]);
//   const [newSchemaOption, setNewSchemaOption] = useState("");
//   const [availableSchemaOptions, setAvailableSchemaOptions] = useState(
//     schemaOptions
//   );

//   const handleSchemaSelection = (e) => {
//     const newSchema = e.target.value;
//     setSelectedSchemas([...selectedSchemas, newSchema]);
//     setAvailableSchemaOptions(
//       availableSchemaOptions.filter((option) => option.value !== newSchema)
//     );
//     setNewSchemaOption("");
//   };

//   const handleNewSchemaOptionChange = (e) => {
//     setNewSchemaOption(e.target.value);
//   };

//   const handleAddNewSchemaOption = () => {
//     if (newSchemaOption !== "") {
//       setSelectedSchemas([...selectedSchemas, newSchemaOption]);
//       setAvailableSchemaOptions(
//         availableSchemaOptions.filter(
//           (option) => option.value !== newSchemaOption
//         )
//       );
//       setNewSchemaOption("");
//     }
//   };


//   const handleSegmentSave = () => {
//     const schema = selectedSchemas.map((selectedSchema) => ({
//       [selectedSchema]: selectedSchema.split("_").join(" ")
//     }));
//     const segmentData = { segment_name: segmentName, schema };
//     console.log(segmentData); // Send the data to server here
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="segmentName">Segment Name:</label>
//         <input
//           type="text"
//           id="segmentName"
//           value={segmentName}
//           onChange={(e) => setSegmentName(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="addSchema">Add Schema to Segment:</label>
//         <select
//           id="addSchema"
//           value={newSchemaOption}
//           onChange={handleNewSchemaOptionChange}
//         >
//           <option value="" disabled>
//             Select Schema
//           </option>
//           {availableSchemaOptions.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleAddNewSchemaOption}>+ Add New Schema</button>
//       </div>
//       <div style={{ border: "1px solid blue", padding: "10px" }}>
//         <p>Selected Schema:</p>
//         <ul>
//           {selectedSchemas.map((selectedSchema, index) => (
//             <li key={index}>
//               {selectedSchema.split("_").join(" ")}

//             </li>
//           ))}
//         </ul>
//       </div>
//       <button onClick={handleSegmentSave}>Save Segment</button>
//     </div>
//   );
// };

// export default SegmentSchemaForm;




import React, { useState } from 'react';

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" }
];

function SchemaDropdown(props) {
  const [selectedOption, setSelectedOption] = useState('');

  function handleAddClick() {
    props.onAdd(selectedOption);
    setSelectedOption('');
  }

  function handleRemoveClick(index) {
    props.onRemove(index);
  }

  const options = schemaOptions.filter(option => !props.selectedOptions.includes(option.value));

  const remainingOption = options.filter(option => !props.selectedOptions.includes(option.value));
  
  
  return (
    <div>
      <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
        <option value="">Add schema to segment</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={handleAddClick}>+ Add new schema</button>
      {props.selectedOptions.map((option, index) => (
        <div key={index}>
            <select>
                <option>{schemaOptions.find(o => o.value === option).label}</option>
                {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
            </select>
          {/* <span>{schemaOptions.find(o => o.value === option).label}</span> */}
          <button onClick={() => handleRemoveClick(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

function SegmentPopup(props) {
  const [segmentName, setSegmentName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  function handleAddSchema(option) {
    setSelectedOptions([...selectedOptions, option]);
  }

  function handleRemoveSchema(index) {
    setSelectedOptions(selectedOptions.filter((option, i) => i !== index));
  }

  function handleSave() {
    const data = {
      segment_name: segmentName,
      schema: selectedOptions.map(option => ({ [option]: schemaOptions.find(o => o.value === option).label }))
    };
    console.log(data);
    props.onClose();
  }

  return (
    <div>
      <div>
        <label>Segment Name:</label>
        <input type="text" value={segmentName} onChange={e => setSegmentName(e.target.value)} />
      </div>
      <SchemaDropdown selectedOptions={selectedOptions} onAdd={handleAddSchema} onRemove={handleRemoveSchema} />
      <button onClick={handleSave}>Save the segment</button>
    </div>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);

  function handleSaveSegmentClick() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  return (
    <div>
      <button onClick={handleSaveSegmentClick}>Save segment</button>
      {showPopup && <SegmentPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default App;
