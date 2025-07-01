import { ChevronDown, ChevronUp } from "lucide-react";
import FeedbackContent from "./FeedbackContent";

export default function AnalysisSection({ sections, expandedSections, toggleSection }) {
  return (
    <div className="flex-1 w-full lg:w-1/2 space-y-6">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">📊 Analysis Breakdown</h2>

      {sections.map((section, index) => (
        <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-600">
          <button
            onClick={() => toggleSection(index)}
            className="flex justify-between items-center w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 cursor-pointer text-left"
          >
            <span className="text-lg font-semibold text-yellow-300">{section.title}</span>
            {expandedSections[index] ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expandedSections[index] && (
            <div className="text-white p-4 space-y-2">
              <FeedbackContent content={section.content} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
