import { useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");

  const getLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("pos", latitude, longitude);
        setMsg(`${latitude}, ${longitude}`)
      }, (error) => {
        console.log('error', error)
        setMsg(error.message)
      });
  }

  return (
    <>
      <button onClick={getLocation} >Show user Location</button>
      <p>{msg}</p>
    </>
  );
}

export default App;
