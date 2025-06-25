import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

export default function App() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [sections, setSections] = useState([]);
  const [error, setError] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setError("");
    setSections([]);
    setExpandedSections({});
    setLoading(true);

    if (!file || !jd) {
      setError("⚠️ Please upload a resume and provide a Job Description.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd", jd);

    try {
      const res = await axios.post("http://localhost:8080/api/analyze/resume", formData);

      const feedback = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (feedback) {
        const extractedSections = splitSections(feedback);
        setSections(extractedSections);
      } else {
        setError("⚠️ Could not extract feedback from the AI response.");
      }
    } catch (err) {
      setError("⚠️ Error contacting backend: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const splitSections = (text) => {
    const sectionRegex = /^(\d+)\.\s+\*\*(.+?):\*\*/gm;

    const matches = [];
    let lastIndex = 0;
    let match;

    while ((match = sectionRegex.exec(text)) !== null) {
      if (matches.length > 0) {
        matches[matches.length - 1].content = text.substring(lastIndex, match.index).trim();
      }
      matches.push({
        title: `${match[1]}. ${match[2].trim()}`,
        content: "",
      });
      lastIndex = sectionRegex.lastIndex;
    }

    if (matches.length > 0) {
      matches[matches.length - 1].content = text.substring(lastIndex).trim();
    } else if (text.trim()) {
      matches.push({
        title: "Feedback",
        content: text.trim(),
      });
    }

    return matches;
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderContent = (text) => {
    const lines = text.split("\n");

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      console.log(`Line ${idx}:`, trimmed);  // Still keep debugging

      // Strength detection
      if (/^\s*\*\s*\*\*\s*Strength\s*:\s*\*\*/i.test(trimmed)) {
        console.log(`✅ Detected Strength Line at ${idx}:`, trimmed);
        return (
          <div key={idx} className="text-green-400 font-semibold mb-2">
            <ReactMarkdown>{trimmed}</ReactMarkdown>
          </div>
        );
      }

      // Weakness detection
      else if (/^\s*\*\s*\*\*\s*Weakness\s*:\s*\*\*/i.test(trimmed)) {
        console.log(`✅ Detected Weakness Line at ${idx}:`, trimmed);
        return (
          <div key={idx} className="text-red-400 font-semibold mb-2">
            <ReactMarkdown>{trimmed}</ReactMarkdown>
          </div>
        );
      }

      // Default text
      else {
        return (
          <div key={idx} className="prose prose-invert max-w-none text-white mb-2">
            <ReactMarkdown>{trimmed}</ReactMarkdown>
          </div>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-6 space-y-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg mb-4">
        🚀 AI Resume Analyzer
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl">

        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl space-y-4 border border-yellow-500">
            <h2 className="text-yellow-300 text-2xl font-bold">📁 Upload Resume (PDF)</h2>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="p-3 bg-gray-700 text-white w-full rounded focus:outline-yellow-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl space-y-4 border border-yellow-500">
            <h2 className="text-yellow-300 text-2xl font-bold">📝 Job Description</h2>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="w-full h-48 p-4 bg-gray-700 text-white rounded resize-none focus:outline-yellow-400 text-lg"
              placeholder="Paste the Job Description here..."
            ></textarea>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-xl shadow-lg font-bold transition transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                🔍 Analyze
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-800 p-4 rounded text-red-200 font-medium shadow-md">
              {error}
            </div>
          )}
        </div>

        {sections.length > 0 && (
          <div className="flex-1 w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">📊 Analysis Breakdown</h2>

            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-600"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="flex justify-between items-center w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 cursor-pointer text-left"
                >
                  <span className="text-lg font-semibold text-yellow-300">{section.title}</span>
                  {expandedSections[index] ? <ChevronUp /> : <ChevronDown />}
                </button>

                {expandedSections[index] && (
                  <div className="text-white p-4 space-y-2">
                    {renderContent(section.content)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="w-full text-center py-6 mt-16 border-t border-gray-700 text-gray-400 text-sm">
        Developed with ❤️ by <span className="text-yellow-400 font-semibold">Sujan Ghosh</span>
      </footer>

    </div>

  );
}
