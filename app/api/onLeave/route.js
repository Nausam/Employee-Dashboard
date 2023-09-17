import { connectToDB } from "@utils/database";
import Request from "@/models/request";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const currentDate = new Date();
    const currentDateString = `${currentDate.getFullYear()}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

    const employeesOnLeave = await Request.find({
      isOnLeave: true,
      leaveStartDate: { $lte: currentDateString },
      leaveEndDate: { $gte: currentDateString },
    }).populate("employee");

    // console.log(employeesOnLeave);

    return new Response(JSON.stringify(employeesOnLeave), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch employees on leave!", { status: 500 });
  }
};
