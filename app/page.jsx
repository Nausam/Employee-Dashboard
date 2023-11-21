"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import LeaveUpdateModal from "@components/LeaveUpdateModal";
import Image from "next/image";

const Home = () => {
  const { data: session } = useSession();

  const [isModalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleOffUpdate = () => {
    setOperation("OFF DAYS");
    setModalOpen(true);
  };

  const handleAnnualUpdate = () => {
    setOperation("ANNUAL LEAVE");
    setModalOpen(true);
  };

  const confirmUpdate = async () => {
    setModalOpen(false);
    try {
      let response;

      if (operation === "OFF DAYS") {
        response = await fetch("/api/updateOffDays", { method: "POST" });
      } else if (operation === "ANNUAL LEAVE") {
        response = await fetch("/api/updateAnnualDays", { method: "POST" });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const message = await response.json();
      console.log(message);
      setSuccessMessage(`Successfully updated ${operation}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelUpdate = () => {
    setModalOpen(false);
  };

  return (
    <section className="w-full h-screen items-center justify-center">
      <div className="flex flex-wrap justify-center items-center gap-5">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-7xl font-bold text-center orange_gradient mb-20 z-50 tracking-wide max-w-md"
          >
            Employee Dashboard
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src="/assets/images/hero.png"
            width={500}
            height={500}
            alt="hero image"
          />
        </motion.div>
      </div>

      {/* {session?.user ? (
        <div className="flex flex-center justify-center items-center gap-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            type="button"
            onClick={handleOffUpdate}
            className="blue_btn"
          >
            <p className="font-satoshi font-medium">UPDATE OFF</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            type="button"
            onClick={handleAnnualUpdate}
            className="blue_btn"
          >
            <p className="font-satoshi font-medium">UPDATE ANNUAL</p>
          </motion.button>
        </div>
      ) : (
        <></>
      )} */}
      <AnimatePresence>
        {isModalOpen && (
          <LeaveUpdateModal
            operation={operation}
            onConfirm={confirmUpdate}
            onCancel={cancelUpdate}
          />
        )}
      </AnimatePresence>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          className="border-2 border-green-400 flex justify-center items-center mt-10 glassmorphism w-[350px] mx-auto"
        >
          <div className="alert alert-success text-center font-satoshi font-semibold text-green-600">
            {successMessage}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Home;
