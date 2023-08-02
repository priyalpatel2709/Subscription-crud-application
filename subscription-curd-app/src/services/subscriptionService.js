// subscriptionService.js
import axios from "axios";

const BASE_URL = "http://localhost:4800"; // Replace with your backend URL

export const fetchSubscriptions = async () => {
  console.log('i am');
  const response = await axios.get(`${BASE_URL}/subscriptions`);
  console.log(response.data);
  return response.data;
};

export const createSubscription = async (subscription) => {
  const response = await axios.post(`${BASE_URL}/subscriptions`, subscription);
  return response.data;
};

export const updateSubscription = async (subscription) => {
  const response = await axios.put(`${BASE_URL}/update/${subscription.id}`, subscription);
  return response.data;
};

export const deleteSubscription = async (id) => {
  await axios.delete(`${BASE_URL}/subscriptions-delete/${id}`);
};

export const deleteSubscriptionDate = async (subscriptionId,gridDetailId) => {
  await axios.delete(`${BASE_URL}/subscriptions-delete/${subscriptionId}/${gridDetailId}`);
};
