const Confirmation = ({ onCancel, onConfirm, message, loadingDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-slate-900 backdrop-filter backdrop-blur-xl bg-opacity-85"
        onClick={onCancel}
      ></div>
      <div className="relative bg-slate-200 p-8 rounded-md text-center shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 ">
        <p className="mb-4 text-white">{message}</p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={onCancel}
            type="button"
            className="py-2 px-3 text-sm font-medium text-black rounded-md border border-red-500 hover:bg-red-600 hover:text-white"
          >
            No, cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="py-2 px-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
          >
            {loadingDelete ? "Deleting..." : "Yes, I'm sure"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
