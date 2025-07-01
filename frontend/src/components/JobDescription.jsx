export default function JobDescription({ jd, setJd }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl space-y-4 border border-yellow-500">
      <h2 className="text-yellow-300 text-2xl font-bold">📝 Job Description</h2>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        className="w-full h-48 p-4 bg-gray-700 text-white rounded resize-none focus:outline-yellow-400 text-lg"
        placeholder="Paste the Job Description here..."
      ></textarea>
    </div>
  );
}
