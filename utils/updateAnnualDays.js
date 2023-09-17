import { connectToDB } from "./database";
import Employee from "@models/employee";

export const updateAnnualDays = async (req) => {
  try {
    await connectToDB();
    const count = await Employee.countDocuments();

    if (count > 0) {
      const result = await Employee.updateMany({}, { $inc: { annual: 2.5 } });

      return { text: () => "Annual days updated successfully", status: 200 };
    } else {
      return {
        text: () => "No employees in the database, skipping annual days update",
        status: 200,
      };
    }
  } catch (error) {
    return { text: () => "Error updating the database", status: 500 };
  }
};
