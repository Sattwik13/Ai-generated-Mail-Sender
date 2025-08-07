import React, { useState } from "react";
import axios from "axios";

export default function EmailForm() {
  const [recipients, setRecipients] = useState("");
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    if (!prompt) return alert("Please enter a prompt");
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/generate-email", { prompt });
      setEmailContent(data.emailContent);
    } catch {
      alert("Failed to generate email");
    }
    setLoading(false);
  };

  const sendEmail = async () => {
    if (!recipients || !subject || !emailContent) return alert("Fill all fields");
    try {
      await axios.post("http://localhost:5000/api/send-email", {
        recipients,
        subject,
        body: emailContent
      });
      alert("Email sent successfully!");
    } catch {
      alert("Failed to send email");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📧 AI Email Sender
      </h2>

      <input
        type="text"
        placeholder="Recipients (comma-separated)"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Email Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Enter your AI prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
      />

      <button
        onClick={generateEmail}
        disabled={loading}
        className={`w-full py-3 rounded-lg mb-4 text-white font-semibold ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "Generate Email"}
      </button>

      <textarea
        placeholder="Generated email will appear here..."
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
        className="w-full p-3 border rounded-lg min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={sendEmail}
        className="mt-4 w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        Send Email
      </button>
    </div>
  );
}
