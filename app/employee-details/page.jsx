"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import classes from "@styles/loader.module.css";
import RequestCard from "@components/RequestCard";
import Card from "@components/Card";

const UpdateEmployee = () => {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");
  const [employee, setEmployee] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployeeDetails = async () => {
      const respone = await fetch(`/api/employees/${employeeId}`);

      const data = await respone.json();

      setEmployee({
        name: data.name,
        designation: data.designation,
        joinedDate: data.joinedDate,
        employeeId: data.employeeId,
        idCardNumber: data.idCardNumber,
        off: data.off,
        annual: data.annual,
        medical: data.medical,
        emergency: data.emergency,
        requests: data.requests,
      });
      setLoading(false);
    };

    if (employeeId) {
      getEmployeeDetails();
    }
  }, [employeeId]);

  return (
    <>
      <div>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="details_card"
          >
            {/* <Card /> */}
            <h1 className="head_text text-center text-orange-500">
              {employee ? employee.name : ""}
            </h1>
            <h2 className="second_text text-center orange_gradient mb-10 ">
              {employee ? employee.designation : ""}
            </h2>

            <div className="glassmorphism_d">
              {" "}
              <div className="flex gap-1">
                <p className="my-1 font-satoshi text-md text-gray-700 mr-5">
                  Joined Date
                </p>
                <p className="my-1 font-satoshi text-md text-gray-700 ml-auto">
                  {employee
                    ? `${new Date(employee.joinedDate).getDate()}-${
                        new Date(employee.joinedDate).getMonth() + 1
                      }-${new Date(employee.joinedDate).getFullYear()}`
                    : ""}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="my-1 font-satoshi text-md text-gray-700 mr-5 ">
                  Employee ID
                </p>
                <p className="my-1 font-satoshi text-md text-gray-700 ml-auto">
                  {employee ? employee.employeeId : ""}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="my-1 font-satoshi text-md text-gray-700 mr-5 ">
                  ID Card Number
                </p>
                <p className="my-1 font-satoshi text-md text-gray-700 ml-auto">
                  {employee ? employee.idCardNumber : ""}
                </p>
              </div>
            </div>

            <div className="glassmorphism_d mt-6 mb-3">
              <div className="flex gap-1">
                <p className="my-1 font-satoshi text-md text-gray-700 mr-5">
                  OFF Days
                </p>
                <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
                  {employee ? employee.off : ""}
                </p>
              </div>

              <div className="flex gap-1">
                <p className="my-1 font-satoshi text-md text-gray-700 mr-5">
                  Annual Leave
                </p>
                <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
                  {employee ? employee.annual : ""}
                </p>
              </div>

              <div className="flex gap-1">
                <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">
                  Medical Leave
                </p>
                <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
                  {employee ? employee.medical : ""}
                </p>
              </div>

              <div className="flex gap-1">
                <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">
                  Emergency Leave
                </p>
                <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
                  {employee ? employee.emergency : ""}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {loading ? (
        <div></div>
      ) : employee && employee.requests && employee.requests.length > 0 ? (
        <div className="mt-5">
          <div className="head_text text-center mb-8 text-blue-500">
            Leave History
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5"
          >
            {employee &&
              employee.requests &&
              employee.requests.map((request) => (
                <RequestCard key={request._id} request={request} />
              ))}
          </motion.div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default UpdateEmployee;
