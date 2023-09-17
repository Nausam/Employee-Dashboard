import { connectToDB } from "@utils/database";
import Employee from "@models/employee";

export const GET = async (request, params) => {
  try {
    await connectToDB();

    const employees = await Employee.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(employees), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all employees!", { status: 500 });
  }
};
