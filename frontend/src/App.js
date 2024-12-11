import logo from './resources/mindjoy_logo.png';
import './App.css';
import React from 'react';

// Main App component
function App() {
  // State variables for the biography and the biography input
  const [biography, setBiography] = React.useState("");
  const [biographyInput, setBiographyInput] = React.useState(true);

  // Function to check if the biography is valid so people can't just enter in one character/word
  function isValidBiography(bio) {
    const regex = /^[a-zA-Z0-9\s,.'-]{15,}$/;
    return regex.test(bio);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to MindJoy!</h1>
        <p>
          Ready to create your avatar? Start by entering an exciting biography below!
        </p>
        <textarea
          value={biography}
          onChange={e => 
            {
              setBiography(e.target.value);
              if ((e.target.value != "") && (isValidBiography(e.target.value))) {
                setBiographyInput(true);
              } else {
                setBiographyInput(false);
              }
            }
          }
          placeholder="Enter your amazing biography here..."
          style={{width: "45%", height:"150px", fontSize: "20px", resize: "both"}}
        />
        {!biographyInput && (
          <button className="App-submitFalse" disabled>
            Submit
          </button>
        )}
        {biographyInput && (
          <button className="App-submitTrue">
            Submit
          </button>
        )}
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
