import React, { useState, useEffect } from "react";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [receivedText, setReceivedText] = useState("");

  // Function to send text to Flask
  const sendTextToFlask = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ copiedText: inputText }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };

  // Function to get text from Flask
  const fetchReceivedText = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/get-text");
      const data = await response.json();
      setReceivedText(data.receivedText);
    } catch (error) {
      console.error("Error fetching text:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchReceivedText, 3000); // Fetch every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>React ↔ Flask Integration</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={sendTextToFlask}>Send to Flask</button>

      <h2>Received from Flask:</h2>
      <p>{receivedText}</p>
    </div>
  );
};

export default App;
