import React,{useState} from "react"
import SchemaDropdown from "./DropdownSchema";
import "./App.css"

const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ];
const AppTask=(props)=>{
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
    <div className='container'>
      <div className="cont2">
       <label>Enter the Name of the Segment</label>
        <input className="segment_input" type="text" value={segmentName} onChange={e => setSegmentName(e.target.value)} />
        <p>To save your segment, you need to add the schemas to build the query</p>
      
      
      <SchemaDropdown selectedOptions={selectedOptions} onAdd={handleAddSchema} onRemove={handleRemoveSchema} />
      
      </div>
       
      <div className="footer">
      <button  className = "footer_btn "onClick={handleSave}>Save the segment</button>
<button className="footer_close_btn" onClick={props.onClose}>Close</button>
      </div>
   

    </div>
  );
}

export default AppTask