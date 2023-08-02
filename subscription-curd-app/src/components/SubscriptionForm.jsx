import React, { useState } from "react";
import '../style/SubscriptionForm.css'

const SubscriptionForm = () => {
  const [subscriptionName, setSubscriptionName] = useState("");
  const [gridDetails, setGridDetails] = useState([]);

  // Function to handle adding a new row to the grid details
  const handleAddGridRow = () => {
    setGridDetails((prevGridDetails) => [
      ...prevGridDetails,
      { date: "", startTime: "", endTime: "" },
    ]);
  };

  // Function to handle removing a row from the grid details
  const handleRemoveGridRow = (indexToRemove) => {
    setGridDetails((prevGridDetails) =>
      prevGridDetails.filter((_, index) => index !== indexToRemove)
    );
  };

  // Function to handle changes in grid details
  const handleGridDetailChange = (index, field, value) => {
    setGridDetails((prevGridDetails) =>
      prevGridDetails.map((gridDetail, i) =>
        i === index ? { ...gridDetail, [field]: value } : gridDetail
      )
    );
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("subscriptionName", subscriptionName);
    console.log("gridDetails", gridDetails);
    // Implement form submission logic here
  };

  return (
    <div className="subscription-form-container">
      <h2>Subscription Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Subscription Name Field */}
        <div>
          <label htmlFor="subscriptionName">Subscription Name:</label>
          <input
            type="text"
            id="subscriptionName"
            value={subscriptionName}
            onChange={(e) => setSubscriptionName(e.target.value)}
            required
            className="input-feld"
          />
        </div>

        {/* GridDetail Fields */}
        {gridDetails.map((gridDetail, index) => (
          <div key={index}>
            {/* Date Field */}
            <label htmlFor={`date-${index}`}>Date:</label>
            <input
              type="date"
              id={`date-${index}`}
              value={gridDetail.date}
              onChange={(e) =>
                handleGridDetailChange(index, "date", e.target.value)
              }
              required
            />

            {/* Start Time Field */}
            <label htmlFor={`startTime-${index}`}>Start Time:</label>
            <input
              type="time"
              id={`startTime-${index}`}
              value={gridDetail.startTime}
              onChange={(e) =>
                handleGridDetailChange(index, "startTime", e.target.value)
              }
              required
            />

            {/* End Time Field */}
            <label htmlFor={`endTime-${index}`}>End Time:</label>
            <input
              type="time"
              id={`endTime-${index}`}
              value={gridDetail.endTime}
              onChange={(e) =>
                handleGridDetailChange(index, "endTime", e.target.value)
              }
              required
            />

            {/* Remove Row Button */}
            <button type="button" onClick={() => handleRemoveGridRow(index)}>
              Remove Row
            </button>
          </div>
        ))}

        <div>
          {/* Add New Row Button */}
          <button type="button" onClick={handleAddGridRow}>
            Add New Row
          </button>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
