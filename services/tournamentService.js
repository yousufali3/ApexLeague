import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { BACKEND_URL } from "./config";

/**
 * Fetch the tournaments the user is registered for.
 * @returns {Promise<Object>} The response data.
 */
export const fetchRegisteredTournaments = async () => {
  const token = useAuthStore.getState().token;

  try {
    const response = await axios.post(
      `${BACKEND_URL}/tournaments/my-registered`,
      {}, // no body needed, so pass an empty object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log('Response from tournamentService:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching registered tournaments:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch registered tournaments"
    );
  }
};

export const fetchAllTournaments = async () => {
  const token = useAuthStore.getState().token;

  try {
    const response = await axios.post(
      `${BACKEND_URL}/tournaments/filter`,
      {}, // No filters, fetch all
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all tournaments:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch all tournaments"
    );
  }
};
