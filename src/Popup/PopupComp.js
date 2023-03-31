import React, { useState } from 'react';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const App = () => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchemaOptions, setNewSchemaOptions] = useState(schemaOptions);

  const handleAddNewSchema = () => {
    setNewSchemaOptions(prevOptions =>
      prevOptions.filter(option => !selectedSchemas.includes(option.value))
    );

    setSelectedSchemas(prevSchemas => [...prevSchemas, '']);
  };

  const handleSchemaChange = (index, value) => {
    setSelectedSchemas(prevSchemas => [
      ...prevSchemas.slice(0, index),
      value,
      ...prevSchemas.slice(index + 1),
    ]);
  };

  const handleSaveSegment = () => {
    const schema = selectedSchemas
      .filter(schema => schema !== '')
      .map(schema => ({ [schema]: schema }));

    const data = { segment_name: segmentName, schema };
    console.log(data); // Send data to server

    setSelectedSchemas([]);
    setNewSchemaOptions(schemaOptions);
    setSegmentName('');
  };

  return (
    <div>
      <h1>Save Segment</h1>
      <input
        type="text"
        placeholder="Segment Name"
        value={segmentName}
        onChange={e => setSegmentName(e.target.value)}
      />
      <button onClick={() => alert('Popup!')}>
        Save Segment
      </button>

      {/* Popup */}
      <div className="popup">
        <h2>Add Schema to Segment</h2>
        {selectedSchemas.map((schema, index) => (
          <select
            key={index}
            value={schema}
            onChange={e => handleSchemaChange(index, e.target.value)}
          >
            <option value="">-- Select a schema --</option>
            {schemaOptions
              .filter(option => !selectedSchemas.includes(option.value))
              .map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        ))}
        <button onClick={handleAddNewSchema}>
          + Add New Schema
        </button>
        <button onClick={handleSaveSegment}>
          Save the Segment
        </button>
      </div>
    </div>
  );
};

export default App;
