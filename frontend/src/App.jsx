import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const result = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await result.json();

      setResponse(data.reply);
    } catch (error) {
      console.error(error);
      setResponse("Could not connect to backend");
    }
  };

  return (
    <div>
      <h1>My AI Chatbot</h1>

      <input
        type="text"
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <h3>Bot Response:</h3>

      <p>{response}</p>
    </div>
  );
}

export default App;
