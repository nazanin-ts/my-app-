import React, { useState } from "react";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";

const DifficultyPage = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = async () => {
    if (!text.trim()) {
      setResult("Please enter or upload some text.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ml-backend-wof3.onrender.com/predict_difficulty", //Render
        { text }
      );
      setResult(response.data.difficulty);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error connecting to backend.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result.trim());
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".pdf")) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const typedarray = new Uint8Array(event.target.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          fullText += strings.join(" ").replace(/\s+/g, " ") + " ";
        }
        setText(fullText.trim());
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Only TXT and PDF files are supported.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Difficulty Checker</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="60"
        placeholder="Enter or upload your text..."
      />
      <br />
      <input type="file" accept=".txt,.pdf" onChange={handleFileUpload} />
      <br />
      <button onClick={handleCheck}>Check Difficulty</button>
      <p style={{ fontWeight: "bold", color: result === "Error" ? "red" : "green" }}>
        {result && `Predicted Difficulty: ${result}`}
      </p>
    </div>
  );
};

export default DifficultyPage;