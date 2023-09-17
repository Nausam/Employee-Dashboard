import { motion } from "framer-motion";

const LeaveUpdateModal = ({ operation, onConfirm, onCancel }) => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></motion.div>
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
                className="text-lg leading-6 font-semibold text-gray-900 font-satoshi"
                id="modal-title"
              >
                Confirm Update
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 font-satoshi">
                  Are you sure you want to update {operation}?
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 flex flex-col md:flex-row justify-center md:justify-end items-center sm:space-x-0">
            <button
              type="button"
              onClick={onConfirm}
              className="update2_btn w-full md:w-auto md:mb-0 mb-1 h-10 md:mr-2"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="cancel2_btn w-full md:w-auto sm:mt-0 mt-1 h-10"
            >
              No
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaveUpdateModal;
