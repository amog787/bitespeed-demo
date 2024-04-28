export default function Topbar({ showError = false, onSave }) {
  return (
    <div className="w-full flex bg-gray-200">
      <div className="flex-1 flex justify-center items-center">
        {showError && (
          <span className="text-base p-2 bg-red-400 text-black rounded-md">
            Cannot save Flow
          </span>
        )}
      </div>
      <div className="w-64 flex justify-center items-center">
        <button
          onClick={onSave}
          className="p-2 border-2 border-blue-400 rounded-md text-blue-500 hover:bg-blue-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
