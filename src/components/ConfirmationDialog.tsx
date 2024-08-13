interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#171717] p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 dark:bg-dark-bg text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 dark:hover:bg-[#252525]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#f30816] text-white py-2 px-4 rounded-md shadow hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50 -z-10"
        onClick={onCancel}
        data-testid="confirmation-overlay"
      />
    </div>
  );
};

export default ConfirmationDialog;
