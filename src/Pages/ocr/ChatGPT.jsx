import React, { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 4000,
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
          },
        }
      );

      setApiResponse(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
      setApiResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={prompt}
            placeholder="Please ask OpenAI"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button disabled={loading || prompt.length === 0} type="submit">
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
      {apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre>
            <strong>API response:</strong>
            {apiResponse}
          </pre>
        </div>
      )}
    </>
  );
};

export default ChatGPT;
