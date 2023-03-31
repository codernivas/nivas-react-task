import React, {useState} from "react"
import AppTask from "./AppTask";
import "./App.css"

function App() {
  const [showPopup, setShowPopup] = useState(false);

  function handleSaveSegmentClick() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }
  return (
    <>
    <div className="main_container">    
    <button className="popup_btn" onClick={handleSaveSegmentClick}>Save segment</button>
    {showPopup && <AppTask  onClose={handleClosePopup} /> }
    

  </div>
  
    
  </>
  );
}

export default App;
