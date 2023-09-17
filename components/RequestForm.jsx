import Link from "next/link";
import { useContext } from "react";
import { motion } from "framer-motion";

import classes from "@styles/loader.module.css";
import { ModalContext } from "@app/ModalContext";

const RequestForm = ({
  type,
  employee,
  request,
  setEmployee,
  setRequest,
  submitting,
  handleSubmit,
}) => {
  const { handleModalOpen } = useContext(ModalContext);

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <h1 className="head_text2 text-left">
        {" "}
        <span className="blue_gradient">{type} for Leave</span>{" "}
      </h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="mt-10 mb-10 w-full max-w-2xl flex flex-col gap-7 galssmorphism "
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Full Name
          </span>
          <input
            type="text"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            required
            className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Designation
          </span>
          <select
            value={employee.designation}
            onChange={(e) =>
              setEmployee({ ...employee, designation: e.target.value })
            }
            required
            className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value=""> Select Designation </option>
            <option value="Supervisor">Supervisor</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Bell Attandent">Bell Attandent</option>
            <option value="Kids club attendant">Kids Club Attendant</option>
            <option value="Gym Assistant">Gym Assistant</option>
            <option value="Back office assistant">Back Office Assistant</option>
            <option value="Shop Assistant">Shop Assistant</option>
          </select>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Employee ID
          </span>
          <input
            type="text"
            value={employee.employeeId}
            onChange={(e) =>
              setEmployee({ ...employee, employeeId: e.target.value })
            }
            required
            className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            ID Card Number
          </span>
          <input
            type="text"
            value={employee.idCardNumber}
            onChange={(e) =>
              setEmployee({ ...employee, idCardNumber: e.target.value })
            }
            required
            className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <div className="flex flex-wrap justify-between">
          <label className="w-1/2 px-2">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Leave Start Date
            </span>
            <input
              type="date"
              // value={employee.leaveStartDate}
              onChange={(e) =>
                setRequest({ ...request, leaveStartDate: e.target.value })
              }
              required
              className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <label className="w-1/2 px-2">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Leave End Date
            </span>
            <input
              type="date"
              // value={employee.leaveEndDate}
              onChange={(e) =>
                setRequest({ ...request, leaveEndDate: e.target.value })
              }
              required
              className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="flex flex-wrap justify-between">
          <label className="lg:w-1/4 md:w-1/3 w-1/3 px-2">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              OFF Days
            </span>
            <input
              type="number"
              // value={request.l_off}
              onChange={(e) => setRequest({ ...request, off: e.target.value })}
              required
              className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <label className="lg:w-1/4 md:w-1/3 w-1/3 px-2">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Annual Leave
            </span>
            <input
              type="number"
              // value={request.annual}
              onChange={(e) =>
                setRequest({ ...request, annual: e.target.value })
              }
              required
              className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <label className="lg:w-1/4 md:w-1/3 w-1/3 px-2">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Medical Leave
            </span>
            <input
              type="number"
              // value={employee.medical}
              onChange={(e) =>
                setRequest({ ...request, medical: e.target.value })
              }
              required
              className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <label className="lg:w-1/4 md:w-1/3 w-1/3 px-2 lg:mt-0 md:mt-5 sm:mt-5 mt-5">
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Emergency Leave
            </span>
            <input
              type="number"
              // value={employee.emergency}
              onChange={(e) =>
                setRequest({ ...request, emergency: e.target.value })
              }
              required
              className="form_input block appearance-none w-full bg-white border border-gray-400 hover:border-blue-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>

        <div className="flex-end mx-3 mb-5 gap-4 ">
          <Link
            href="/all-employees"
            className="text-gray-500 text-sm cancel_btn"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm request_btn rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </motion.form>
    </section>
  );
};

export default RequestForm;
