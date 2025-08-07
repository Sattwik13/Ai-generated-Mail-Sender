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
  // Main container with a dark background, subtle border, and more padding
  <div className="max-w-3xl mx-auto p-8 bg-slate-950/20 backdrop-blur-md border  border-slate-700 rounded-2xl text-white">
    
    {/* Trendy gradient text for the title */}
    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500">
      ✨ AI Email Sender
    </h2>

    {/* Input fields styled for dark mode with improved focus states */}
    <input
      type="text"
      placeholder="Recipients"
      value={recipients}
      onChange={(e) => setRecipients(e.target.value)}
      className="w-full p-3 bg-slate-900/40 text-gray-200 border border-slate-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-500"
    />

    <input
      type="text"
      placeholder="Subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="w-full p-3 bg-slate-900/40 text-gray-200 border border-slate-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-500"
    />

    <textarea
      placeholder="Enter your prompt to generate an email..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className="w-full p-3 bg-slate-900/40 text-gray-200 border border-slate-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder:text-gray-500 min-h-[100px]"
    />

    {/* "Generate Email" button with a gradient and loading state */}
    <button
      onClick={generateEmail}
      disabled={loading}
      // Base classes for styling, transitions, and focus states
      className={`
        w-full py-3 rounded-lg mb-4 text-white font-mono text-lg 
        transition-all duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        focus-visible:ring-offset-slate-900 focus-visible:ring-teal-400
        ${
          loading
            ? // Classes for the disabled/loading state
              "bg-slate-700 cursor-not-allowed"
            : // Classes for the active, interactive state
              `bg-gradient-to-r from-indigo-500 to-teal-600 
              hover:from-indigo-600 hover:to-teal-700 
              hover:shadow-lg hover:shadow-teal-500/40
              active:scale-95`
        }
      `}
    >
      {loading ? "Generating..." : "Generate Email"}
    </button>

    
    {/* A subtle divider for better visual separation */}
    <hr className="border-slate-700 my-4" />

    {/* Textarea for the generated email content, with more vertical space */}
    <textarea
      placeholder="Generated email will appear here..."
      value={emailContent}
      onChange={(e) => setEmailContent(e.target.value)}
      className="w-full p-3 bg-slate-900/50 text-gray-300 border border-slate-700 rounded-lg min-h-[250px] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
    />

    {/* "Send Email" button with a vibrant green gradient */}
    <button
      onClick={sendEmail}
      // Base classes for styling, transitions, and focus states
      className={`
        mt-4 w-full py-3 rounded-lg text-white font-bold text-lg 
        transition-all duration-200 ease-in-out
        bg-gradient-to-r from-teal-500 to-indigo-500 
        hover:from-teal-600 hover:to-indigo-500 
        hover:shadow-lg hover:shadow-blue-500/40
        active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        focus-visible:ring-offset-slate-900 focus-visible:ring-blue-400
      `}
    >
      Send Email
    </button>

  </div>
);

}
