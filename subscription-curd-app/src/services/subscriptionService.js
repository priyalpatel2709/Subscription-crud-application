import axios from "axios";

const BASE_URL = "http://localhost:4800";

export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

export const createSubscription = async (subscription) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/subscriptions`,
      subscription
    );
    return response.data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

export const updateSubscription = async (subscription, id) => {
  try {
    console.log("subscription", subscription);
    const response = await axios.put(
      `${BASE_URL}/update/${subscription._id}/${id}`,
      subscription
    );
    return response.data;
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
};

export const deleteSubscription = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/subscriptions-delete/${id}`);
  } catch (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
};

export const deleteSubscriptionDate = async (subscriptionId, gridDetailId) => {
  try {
    await axios.delete(
      `${BASE_URL}/subscriptions-delete/${subscriptionId}/${gridDetailId}`
    );
  } catch (error) {
    console.error("Error deleting subscription date:", error);
    throw error;
  }
};
