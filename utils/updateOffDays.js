import { connectToDB } from "./database";
import Employee from "@models/employee";

export const updateOffDays = async (req) => {
  try {
    await connectToDB();
    const count = await Employee.countDocuments();

    if (count > 0) {
      const result = await Employee.updateMany({}, { $inc: { off: 1 } });

      return { text: () => "Off days updated successfully", status: 200 };
    } else {
      return {
        text: () => "No employees in the database, skipping off days update",
        status: 200,
      };
    }
  } catch (error) {
    return { text: () => "Error updating the database", status: 500 };
  }
};
