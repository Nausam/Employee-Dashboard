import { useContext, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { ModalContext } from "../app/ModalContext";

const EmployeeCard = ({ employees }) => {
  const [expanded, setExpanded] = useState(false);
  const [showRequestButton, setShowRequestButton] = useState(false);
  const [isDeleteButtonHovered, setIsDeleteButtonHovered] = useState(false);
  const [isRequestButtonHovered, setIsRequestButtonHovered] = useState(false);
  const [isUpdateButtonHovered, setIsUpdateButtonHovered] = useState(false);

  const { handleModalOpen } = useContext(ModalContext);

  const { data: session } = useSession();

  const handleCardClick = (event) => {
    setExpanded(!expanded);
    // setShowRequestButton(!showRequestButton);
  };

  const router = useRouter();

  const toDetailsPage = () => {
    router.push(`/employee-details?id=${employees._id}`);
  };

  const toUpdatePage = (event) => {
    event.stopPropagation();
    router.push(`/employee-update?id=${employees._id}`);
  };

  const toRequestPage = (event) => {
    event.stopPropagation();
    router.push(`/employee-request?id=${employees._id}`);
  };

  const handleDelete = async () => {
    setIsDeleteButtonHovered(false);
    handleModalOpen({
      text: "Are you sure you want to delete this employee?",
      onConfirm: async () => {
        try {
          await fetch(`/api/employees/${employees._id.toString()}`, {
            method: "DELETE",
          });

          location.reload();
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const handleNameClick = (event) => {
    event.stopPropagation();
    toDetailsPage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={session?.user ? handleCardClick : handleNameClick}
      className={`prompt_card ${
        expanded
          ? "border-2  border-blue-500 "
          : "border border-blue-200 hover:border-blue-500 transition-colors duration-200 ease-in-out cursor-pointer  "
      } cursor-pointer  ${
        expanded ? "expanded shadow-2xl" : "hover:shadow-xl"
      }`}
    >
      <div className="flex-col flex-between gap-2">
        <p
          className="my-2 font-satoshi text-2xl font-semibold text-gray-700 blue_gradient"
          onClick={session?.user ? handleNameClick : handleCardClick}
        >
          {employees.name}
        </p>
        <p className=" font-satoshi text-md text-gray-700 mb-5">
          {employees.designation}
        </p>
      </div>
      {expanded && session?.user ? (
        <div className="flex gap-1 justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`relative flex items-center justify-center ${
              isUpdateButtonHovered
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 w-20"
                : "bg-gradient-to-r from-blue-500 to-cyan-400 w-10"
            } text-white rounded-full h-10 overflow-hidden cursor-pointer
    transition-all duration-300 ease-in-out`}
            onMouseEnter={() => setIsUpdateButtonHovered(true)}
            onMouseLeave={() => setIsUpdateButtonHovered(false)}
            onClick={toUpdatePage}
          >
            <img
              src="/assets/icons/update.png"
              alt="Update"
              className={`${
                isUpdateButtonHovered ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300 ease-in-out`}
              width={45}
              height={45}
            />
            <span
              className={`absolute text-center transition-opacity duration-400 ease-in-out ${
                isUpdateButtonHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Update
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`relative flex items-center justify-center ${
              isRequestButtonHovered
                ? "bg-gradient-to-r from-orange-500 to-yellow-400 w-20"
                : "bg-gradient-to-r from-orange-500 to-yellow-400 w-10"
            } text-white rounded-full h-10 overflow-hidden cursor-pointer
  transition-all duration-300 ease-in-out`}
            onMouseEnter={() => setIsRequestButtonHovered(true)}
            onMouseLeave={() => setIsRequestButtonHovered(false)}
            onClick={toRequestPage}
          >
            <img
              src="/assets/icons/request.png"
              alt="Request"
              className={`${
                isRequestButtonHovered ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300 ease-in-out`}
              width={45}
              height={45}
            />
            <span
              className={`absolute text-center transition-opacity duration-400 ease-in-out ${
                isRequestButtonHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Request
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`relative flex items-center justify-center ${
              isDeleteButtonHovered
                ? "bg-gradient-to-r from-red-500 to-pink-400 w-20"
                : "bg-gradient-to-r from-red-500 to-pink-400 w-10"
            } text-white rounded-full h-10 overflow-hidden cursor-pointer
    transition-all duration-300 ease-in-out`}
            onMouseEnter={() => setIsDeleteButtonHovered(true)}
            onMouseLeave={() => setIsDeleteButtonHovered(false)}
            onClick={handleDelete}
          >
            <img
              src="/assets/icons/delete.png"
              alt="Delete"
              className={`${
                isDeleteButtonHovered ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300 ease-in-out`}
              width={45}
              height={45}
            />
            <span
              className={`absolute text-center transition-opacity duration-400 ease-in-out ${
                isDeleteButtonHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Delete
            </span>
          </motion.div>
        </div>
      ) : (
        <div></div>
      )}
    </motion.div>
  );
};

export default EmployeeCard;
