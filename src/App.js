import React, {useState, useEffect} from 'react'
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continous = true
mic.interimResults = true
mic.lang = "en-US"


function App() {

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if(isListening){
      mic.start()
      mic.onend = () => {
        console.log("Continue..");
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      }
    }

    mic.onstart = () => {
      console.log("Mic on");
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

      console.log(transcript);

      setNote(transcript)

      mic.onerror = event => {
        console.log(event.error);
      }
    }

  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          <div>
            <button onClick={() => setIsListening(prevSatate => !prevSatate)}>Start/Stop</button>
            <button onClick={handleSaveNote} disabled={!note}>Save Note</button>
          </div>
          <br />
          <div>
            {note}
          </div>
        </div> 
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
