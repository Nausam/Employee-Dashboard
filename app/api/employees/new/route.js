import { connectToDB } from "@utils/database";

import Employee from "@models/employee";

export const POST = async (req) => {
  const {
    userId,
    name,
    designation,
    joinedDate,
    employeeId,
    idCardNumber,
    off,
    annual,
    medical,
    emergency,
    image,
  } = await req.json();

  try {
    await connectToDB();

    const newEmployee = new Employee({
      creator: userId,
      name,
      designation,
      joinedDate,
      employeeId,
      idCardNumber,
      off,
      annual,
      medical,
      emergency,
      image,
    });

    await newEmployee.save();

    return new Response(JSON.stringify(newEmployee), { status: 201 });
  } catch (error) {
    return new Response("Failed to create employee!", { status: 500 });
  }
};
