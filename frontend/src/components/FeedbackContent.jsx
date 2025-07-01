import ReactMarkdown from "react-markdown";

export default function FeedbackContent({ content }) {
  const lines = content.split("\n");

  return lines.map((line, idx) => {
    const trimmed = line.trim();

    if (/^\s*\*\s*\*\*\s*Strength\s*:\s*\*\*/i.test(trimmed)) {
      return (
        <div key={idx} className="text-green-400 font-semibold mb-2">
          <ReactMarkdown>{trimmed}</ReactMarkdown>
        </div>
      );
    }

    if (/^\s*\*\s*\*\*\s*Weakness\s*:\s*\*\*/i.test(trimmed)) {
      return (
        <div key={idx} className="text-red-400 font-semibold mb-2">
          <ReactMarkdown>{trimmed}</ReactMarkdown>
        </div>
      );
    }

    return (
      <div key={idx} className="prose prose-invert max-w-none text-white mb-2">
        <ReactMarkdown>{trimmed}</ReactMarkdown>
      </div>
    );
  });
}
