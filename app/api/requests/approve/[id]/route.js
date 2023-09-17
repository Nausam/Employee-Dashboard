import Employee from "@models/employee";
import Request from "@models/request";
import { connectToDB } from "@utils/database";

export const PUT = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the request by ID
    const approvedRequest = await Request.findById(params.id);

    if (!approvedRequest) {
      return new Response("Request not found", { status: 404 });
    }

    // Find the corresponding employee and deduct the values
    const employee = await Employee.findById(approvedRequest.employee);

    if (!employee) {
      return new Response("Employee not found", { status: 404 });
    }

    // Deduct the values from the employee
    employee.off -= approvedRequest.off;
    employee.annual -= approvedRequest.annual;
    employee.medical -= approvedRequest.medical;
    employee.emergency -= approvedRequest.emergency;

    approvedRequest.isOnLeave = "true";

    // Save the updated employee
    await employee.save();

    // Update the request as approved
    approvedRequest.approved = true;
    await approvedRequest.save();

    return new Response("Request approved successfully", { status: 200 });
  } catch (error) {
    return new Response("Error approving request", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the request by ID and remove it
    await Request.findByIdAndRemove(params.id);

    return new Response("Employee deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting employee", { status: 500 });
  }
};
