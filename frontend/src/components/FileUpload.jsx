export default function FileUpload({ setFile }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl space-y-4 border border-yellow-500">
      <h2 className="text-yellow-300 text-2xl font-bold">📁 Upload Resume (PDF)</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="p-3 bg-gray-700 text-white w-full rounded focus:outline-yellow-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
      />
    </div>
  );
}
