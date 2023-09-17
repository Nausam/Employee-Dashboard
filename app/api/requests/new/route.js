import { connectToDB } from "@utils/database";

import Request from "@models/request";
import Employee from "@models/employee";

export const POST = async (req) => {
  const {
    employee,
    name,
    designation,
    employeeId,
    idCardNumber,
    off,
    annual,
    medical,
    emergency,
    leaveStartDate,
    leaveEndDate,
  } = await req.json();

  try {
    await connectToDB();

    const newRequest = new Request({
      employee,
      name,
      designation,
      employeeId,
      idCardNumber,
      off,
      annual,
      medical,
      emergency,
      leaveStartDate,
      leaveEndDate,
    });

    await newRequest.save();

    await Employee.findByIdAndUpdate(employee, {
      $push: { requests: newRequest._id },
    });

    return new Response(JSON.stringify(newRequest), { status: 201 });
  } catch (error) {
    return new Response("Failed to create request!", { status: 500 });
  }
};
