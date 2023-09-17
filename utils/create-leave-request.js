// utils/create-leave-request.js
import { connectToDB } from "@/database";
import Employee from "@/models/employee";

export const createLeaveRequest = async (req) => {
  const { employeeId, leaveRequest } = await req.json();

  try {
    await connectToDB();

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { $push: { "leave.requests": leaveRequest } },
      { new: true }
    );

    if (!employee) {
      return new Response("Employee not found", { status: 400 });
    }

    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create leave request!", { status: 500 });
  }
};
