"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import EmployeeCard from "./EmployeeCard";
import classes from "@styles/loader.module.css";

const EmployeeCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((employees) => (
        <EmployeeCard
          key={employees._id}
          employees={employees}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [designationTerm, setDesignationTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/api/employees");
      const data = await response.json();

      setAllEmployees(data);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = allEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (designationTerm === "" ||
        employee.designation.toLowerCase() === designationTerm.toLowerCase())
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full sm:max-w-md mx-auto p-6 space-y-8"
      >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search By Name"
            className="search_input"
          />

          <select
            value={designationTerm}
            onChange={(e) => setDesignationTerm(e.target.value)}
            className="designation_input text-gray-400"
          >
            <option value=""> Search By Designation </option>
            <option className="text-gray-600" value="Supervisor">
              Supervisor
            </option>
            <option className="text-gray-600" value="Receptionist">
              Receptionist
            </option>
            <option className="text-gray-600" value="Bell Attendant">
              Bell Attendant
            </option>
            <option className="text-gray-600" value="Kids club Attendant">
              Kids Club Attendant
            </option>
            <option className="text-gray-600" value="Gym Assistant">
              Gym Assistant
            </option>
            <option className="text-gray-600" value="Back office Assistant">
              Back Office Assistant
            </option>
            <option className="text-gray-600" value="Shop Assistant">
              Shop Assistant
            </option>
          </select>
        </div>
      </motion.div>

      <section className="feed">
        {loading ? (
          <div className={classes.customLoader}>
            <div className={classes.customLoader__do}></div>
            <div className={classes.customLoader__dot}></div>
            <div className={classes.customLoader__dot}></div>
            <div className={classes.customLoader__dot}></div>
            <div className={classes.customLoader__dot}></div>
            <div className={classes.customLoader__dot}></div>
            <div className={classes.customLoader__dot}></div>
            <div className={classes.customLoader__dot}></div>
            <div className={classes.customLoader__dot}></div>
          </div>
        ) : (
          <EmployeeCardList data={filteredEmployees} />
        )}
      </section>
    </>
  );
};

export default Feed;
