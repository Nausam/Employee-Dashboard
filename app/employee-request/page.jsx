"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import RequestForm from "@components/RequestForm";
import Modal from "@components/Modal";

const CreateRequest = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const { data: session } = useSession();

  const [request, setRequest] = useState({
    name: "",
    designation: "",
    employeeId: "",
    idCardNumber: "",
    off: "",
    annual: "",
    medical: "",
    emergency: "",
    leaveStartDate: "",
    leaveEndDate: "",
  });

  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    employeeId: "",
    idCardNumber: "",
    off: "",
    annual: "",
    medical: "",
    emergency: "",
    leaveStartDate: "",
    leaveEndDate: "",
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
      });
    };

    if (employeeId) getEmployeeDetails();
  }, [employeeId]);

  const CreateRequests = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!employeeId) {
      setModalMessage("Missing employee ID");
      setShowModal(true);
      setSubmitting(false);
      return;
    }

    // Check if there are enough days available for each leave type
    if (parseInt(request.off) > parseInt(employee.off)) {
      setModalMessage(
        "Not enough OFF leave days available. Please review your request."
      );
      setShowModal(true);
      setSubmitting(false);
      return;
    }
    if (parseInt(request.annual) > parseInt(employee.annual)) {
      setModalMessage(
        "Not enough ANNUAL leave days available. Please review your request."
      );
      setShowModal(true);
      setSubmitting(false);
      return;
    }

    if (parseInt(request.medical) > parseInt(employee.medical)) {
      setModalMessage(
        "Not enough MEDICAL leave days available. Please review your request."
      );
      setShowModal(true);
      setSubmitting(false);
      return;
    }

    if (parseInt(request.emergency) > parseInt(employee.emergency)) {
      setModalMessage(
        "Not enough EMERGENCY leave days available. Please review your request."
      );
      setShowModal(true);
      setSubmitting(false);
      return;
    }

    // Calculating total number of entered days
    const totalEnteredDays =
      Number(request.off) +
      Number(request.annual) +
      Number(request.medical) +
      Number(request.emergency);

    // Calculating total number of days between start and end dates
    const startDate = new Date(request.leaveStartDate);
    const endDate = new Date(request.leaveEndDate);
    const totalDays =
      Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // +1 because the end day is inclusive

    if (totalEnteredDays !== totalDays) {
      setModalMessage(
        "The total number of leave days does not match the date range selected. Please review your request."
      );
      setShowModal(true);
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/requests/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee: employeeId,
          name: employee.name,
          designation: employee.designation,
          idCardNumber: employee.idCardNumber,
          employeeId: employee.employeeId,
          off: request.off,
          annual: request.annual,
          medical: request.medical,
          emergency: request.emergency,
          leaveStartDate: request.leaveStartDate,
          leaveEndDate: request.leaveEndDate,
        }),
      });

      if (response.ok) {
        router.push(`/employee-details?id=${employeeId}`);
      } else {
        const error = await response.json();
        setModalMessage(error.message);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      setModalMessage(error.message);
      setShowModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <RequestForm
        type="Request"
        employee={employee}
        request={request}
        setEmployee={setEmployee}
        setRequest={setRequest}
        submiting={submitting}
        handleSubmit={CreateRequests}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        errorMessage={modalMessage}
      />
    </>
  );
};

export default CreateRequest;
