import { useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import JobDescription from "./components/JobDescription";
import AnalysisSection from "./components/AnalysisSection";
import ErrorMessage from "./components/ErrorMessage";
import { Loader2 } from "lucide-react";

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
        setSections(splitSections(feedback));
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
      matches.push({ title: "Feedback", content: text.trim() });
    }

    return matches;
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-6 space-y-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg mb-4">
        🚀 AI Resume Analyzer
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl">
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <FileUpload setFile={setFile} />
          <JobDescription jd={jd} setJd={setJd} />

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
              <>🔍 Analyze</>
            )}
          </button>

          {error && <ErrorMessage message={error} />}
        </div>

        {sections.length > 0 && (
          <AnalysisSection
            sections={sections}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}
      </div>

      <footer className="w-full text-center py-6 mt-16 border-t border-gray-700 text-gray-400 text-sm">
        Developed with ❤️ by <span className="text-yellow-400 font-semibold">Sujan Ghosh</span>
      </footer>
    </div>
  );
}
