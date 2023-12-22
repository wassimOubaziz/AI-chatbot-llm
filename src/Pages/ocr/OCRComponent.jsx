import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRComponent = () => {
  const [ocrText, setOcrText] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Perform OCR on the selected file
      Tesseract.recognize(
        file,
        "eng", // Language code (English in this case)
        { logger: (info) => console.log(info) } // Optional logger for progress info
      ).then(({ data: { text } }) => {
        setOcrText(text);
      });
    }
  };

  return (
    <div>
      <h1>OCR Demo</h1>
      <input type="file" onChange={handleFileChange} />
      <div>
        <h2>OCR Result:</h2>
        <pre>{ocrText}</pre>
      </div>
    </div>
  );
};

export default OCRComponent;
