import { updateOffDays } from "@utils/updateOffDays";

export const POST = async (req, res) => {
  try {
    const response = await updateOffDays(req);
    console.log(`Response: ${JSON.stringify(response)}`);
    return new Response(JSON.stringify(response), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Error in POST function: ${error}`);
    throw error;
  }
};
