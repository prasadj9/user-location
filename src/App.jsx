import { useState } from "react";
import "./App.css";

function App() {
  const apiEndpoint = import.meta.env.VITE_APP_BASE_URL;
  const apikey = import.meta.env.VITE_APP_API_KEY;
  const [msg, setMsg] = useState("");
  const [address, setAddress] = useState("");

  const getUserAddress = async (latitude, longitude) => {

    let query = `${latitude},${longitude}`;
    let apiUrl = `${apiEndpoint}?key=${apikey}&q=${query}&pretty=1`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setAddress(data?.results[0]?.formatted)
      console.log('data', data?.results[0]?.formatted)
    } catch (error) {
      console.log('error', error)
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        getUserAddress(latitude, longitude)
        setMsg(`${latitude}, ${longitude}`);
      },
      (error) => {
        console.log("error", error);
        setMsg(error.message);
      }
    );
  };

  return (
    <>
      <button onClick={getLocation}>Show user Location</button>
      <p>{msg}</p>
      {address && <p>Address : {address}</p>}
    </>
  );
}

export default App;
