export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-800 p-4 rounded text-red-200 font-medium shadow-md">
      {message}
    </div>
  );
}
