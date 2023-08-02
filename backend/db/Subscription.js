const mongoose = require('mongoose');

// Define the schema for the grid details
const gridDetailSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

// Define the schema for the subscription
const subscriptionSchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  name: { type: String, required: true },
  gridDetails: [gridDetailSchema], // Embed the grid details schema as an array
});

// Create a model based on the subscription schema
const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;
