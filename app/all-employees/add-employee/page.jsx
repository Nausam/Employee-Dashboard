"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AddForm from "@components/AddForm";

const AddEmployee = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

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

  const createEmployee = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/employees/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
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
        router.push("/all-employees");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AddForm
      type="Add"
      employee={employee}
      setEmployee={setEmployee}
      submiting={submitting}
      handleSubmit={createEmployee}
    />
  );
};

export default AddEmployee;
