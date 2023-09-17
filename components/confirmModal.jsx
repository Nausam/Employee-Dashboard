import { motion } from "framer-motion";

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  actionButtonLabel = "Delete",
  isApprove = false,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </motion.div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="font-satoshi font-bold text-lg leading-6 text-gray-900"
                id="modal-title"
              >
                Confirm Action
              </h3>
              <div className="mt-2">
                <p className="font-satoshi text-sm text-gray-600">{children}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 flex flex-col md:flex-row justify-center md:justify-end items-center sm:space-x-0">
            <button
              type="button"
              className={`${
                isApprove ? "update2_btn" : "delete_btn"
              } w-full md:w-auto sm:mt-0 mt-1 h-10 sm:mr-4 mr-0 `}
              onClick={onConfirm}
            >
              {actionButtonLabel}
            </button>
            <button
              type="button"
              className="cancel2_btn w-full md:w-auto sm:mt-0 mt-2 h-10"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfirmModal;
