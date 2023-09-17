"use client";

import { useSession } from "next-auth/react";
import React, { useContext, useState, useEffect } from "react";

import classes from "@styles/input.module.css";
import { ModalContext } from "../app/ModalContext";

const RequestCard = ({ request }) => {
  const [isApproved, setIsApproved] = useState(request.approved);
  const [isRejected, setIsRejected] = useState(false);

  const { data: session } = useSession();

  const { handleModalOpen } = useContext(ModalContext);

  // Convert the ISO date string to a Date object
  const leaveStartDate = new Date(request.leaveStartDate);
  const leaveEndDate = new Date(request.leaveEndDate);
  // Format the date
  const formattedStartDate = `${leaveStartDate.getDate()}/${
    leaveStartDate.getMonth() + 1
  }/${leaveStartDate.getFullYear()}`;

  const formattedEndDate = `${leaveEndDate.getDate()}/${
    leaveEndDate.getMonth() + 1
  }/${leaveEndDate.getFullYear()}`;

  const handleDelete = async () => {
    handleModalOpen({
      text: "Are you sure you want to reject this this leave request?",
      onConfirm: async () => {
        try {
          await fetch(`/api/requests/approve/${request._id.toString()}`, {
            method: "DELETE",
          });

          location.reload();
        } catch (error) {
          console.log(error);
        }
      },
      actionButtonLabel: "Reject",
      isApprove: false,
    });
  };

  const approveRequest = async () => {
    handleModalOpen({
      text: "Are you sure you want to approve this leave request?",
      onConfirm: async () => {
        try {
          await fetch(`/api/requests/approve/${request._id.toString()}`, {
            method: "PUT",
          });

          setIsApproved(true);
          setIsRejected(false);
          location.reload();
        } catch (error) {
          console.log(error);
        }
      },
      actionButtonLabel: "Approve",
      isApprove: true,
    });
  };

  useEffect(() => {
    setIsApproved(request.approved);
  }, [request.approved]);
  return (
    <div
      className={`request_card ${
        isApproved ? "border-green-400" : "border-red-400"
      }`}
    >
      <div className="flex gap-1">
        <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">
          Start Date
        </p>
        <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
          {formattedStartDate}
        </p>
      </div>

      <div className="flex gap-1">
        <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">
          End Date
        </p>
        <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
          {formattedEndDate}
        </p>
      </div>

      <div className="flex gap-1">
        <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">OFF</p>
        <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
          {request.off}
        </p>
      </div>

      <div className="flex gap-1">
        <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">Annual</p>
        <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
          {request.annual}
        </p>
      </div>

      <div className="flex gap-1">
        <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">
          Medical
        </p>
        <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
          {request.medical}
        </p>
      </div>

      <div className="flex gap-1">
        <p className="my-1 font-satoshi text-md text-gray-700 mr-5  ">
          Emergency
        </p>
        <p className="my-1 font-satoshi text-md text-gray-700 ml-auto ">
          {request.emergency}
        </p>
      </div>

      <div className="flex gap-1 justify-between mt-5">
        {session?.user ? (
          <div className="flex justify-between">
            <div
              className="update2_btn cursor-pointer"
              onClick={approveRequest}
              style={{ display: isApproved || isRejected ? "none" : "block" }}
            >
              Approve
            </div>
            <div
              className="delete_btn cursor-pointer ml-[70px]"
              onClick={handleDelete}
              style={{ display: isApproved || isRejected ? "none" : "block" }}
            >
              Reject
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {!isApproved && !session?.user ? (
        <div className="text-center waiting_text text-red-500">
          Pending approval
        </div>
      ) : (
        <></>
      )}
      {isApproved && (
        <p className="font-satoshi text-lg text-green-600 text-center font-bold">
          Approved
        </p>
      )}
      {isRejected && (
        <p className="font-satoshi text-md text-red-600">Rejected</p>
      )}
    </div>
  );
};

export default RequestCard;
