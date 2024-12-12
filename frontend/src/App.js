import logo from './resources/mindjoy_logo.png';
import './App.css';
import { useState } from 'react';
import axios from "axios";


// Main App component
function App() {
  // State variables for the biography and the biography input
  const [biography, setBiography] = useState("");
  const [biographyInput, setBiographyInput] = useState(false);
  const [AIPhoto, setAIPhoto] = useState('https://p.potaufeu.asahi.com/1831-p/picture/27695628/89644a996fdd0cfc9e06398c64320fbe.jpg');

  // Function to check if the biography is valid so people can't just enter in one character/word
  function isValidBiography(bio) {
    const regex = /^.{15,}$/;
    return regex.test(bio);
  }

  // Function to handle the submit button
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:7777/generate_image", { post: biography });
      setAIPhoto(response.data.image_url);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className ="Top">
          <h1 className="Heading">Vocalizing <span className="AI">AI</span> Avatars</h1>
          <h2 className="Subheading">
            Ready to create your avatar? Start by entering an exciting biography below!
          </h2>
        </div>
        <div className="Middle">
          <div className="MiddleLeft">
            <textarea className = "TextBox"
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
            />
            {!biographyInput && (
              <button className="SubmitFalse" disabled={true}>
                Submit
              </button>
            )}
            {biographyInput && (
              <button className="SubmitTrue" disabled={false} onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
          <div className="MiddleRight">
            <img 
              src={AIPhoto} 
              className="Avatar" 
              alt="avatar" 
            />
            <img 
              src={logo} 
              className="Logo" 
              alt="Mindjoy_Logo" 
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
