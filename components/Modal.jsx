import { motion } from "framer-motion";

const Modal = ({ showModal, setShowModal, errorMessage }) => {
  return showModal ? (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 transition-opacity "
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </motion.div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3
                className="text-lg leading-6 font-bold text-red-500"
                id="modal-title font-satoshi"
              >
                ERROR
              </h3>
              <div className="mt-2">
                <p className="font-satoshi text-sm text-gray-500">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex flex flex-center">
            <button
              type="button"
              className="mt-3 justify-center cancel_btn "
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
