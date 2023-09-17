"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import AddForm from "@components/AddForm";

const UpdateEmployee = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");
  const [requests, setRequests] = useState([]);

  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    joinedDate: "",
    employeeId: "",
    idCardNumber: "",
    off: "",
    annual: "",
    medical: "",
    emergency: "",
    image: "",
  });

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
        image: data.image,
      });
    };

    if (employeeId) getEmployeeDetails();
  }, [employeeId]);

  const UpdateEmployee = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!employeeId) return alert("Missing employee ID");

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: employee.name,
          designation: employee.designation,
          joinedDate: employee.joinedDate,
          employeeId: employee.employeeId,
          idCardNumber: employee.idCardNumber,
          off: employee.off,
          annual: employee.annual,
          medical: employee.medical,
          emergency: employee.emergency,
          image: employee.image,
        }),
      });

      if (response.ok) {
        router.push(`/employee-details?id=${employeeId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AddForm
      type="Update"
      employee={employee}
      setEmployee={setEmployee}
      submiting={submitting}
      handleSubmit={UpdateEmployee}
    />
  );
};

export default UpdateEmployee;
