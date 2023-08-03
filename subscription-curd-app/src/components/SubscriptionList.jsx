import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/SubscriptionList.css";
import {
  fetchSubscriptions,
  deleteSubscriptionDate,
  deleteSubscription,
  updateSubscription,
} from "../services/subscriptionService";


const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedSubscription, setEditedSubscription] = useState({});
  const [editedGridDetail, setEditedGridDetail] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const fetchedSubscriptions = await fetchSubscriptions();
      setSubscriptions(fetchedSubscriptions);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditRow = (subscription, gridDetail) => {
    setEditedSubscription(subscription);
    setEditedGridDetail(gridDetail);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Create a new grid details array with the updated grid detail
      const updatedGridDetailsArray = editedSubscription.gridDetails.map(
        (gridDetail) =>
          gridDetail.date === editedGridDetail.date
            ? { ...editedGridDetail }
            : gridDetail
      );
  
      // Update the edited subscription with the updated grid details array
      const updatedSubscription = {
        ...editedSubscription,
        gridDetails: updatedGridDetailsArray, // Update the grid details
      };
  
      // Make the API call to update the subscription
      const updatedSubscriptionData = await updateSubscription(
        updatedSubscription,
        editedGridDetail._id
      );
  
      // Find the index of the subscription in the array
      const subscriptionIndex = subscriptions.findIndex(
        (subscription) => subscription._id === updatedSubscriptionData._id
      );
  
      // Create a new subscriptions array with the updated subscription at the correct index
      const updatedSubscriptions = [...subscriptions];
      updatedSubscriptions[subscriptionIndex] = updatedSubscriptionData;
  
      // Update the state with the modified subscriptions array
      setSubscriptions(updatedSubscriptions);
  
      // Hide the edit modal and reload the data
      setShowEditModal(false);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleRemoveDate = async (subscriptionId, dateId) => {
    try {
      await deleteSubscriptionDate(subscriptionId, dateId);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      await deleteSubscription(id);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameChange = (event) => {
    setEditedSubscription({ ...editedSubscription, name: event.target.value });
  };

  return (
    <div>
      <h2>Subscription List</h2>
      {
        subscriptions.length >0 ? 
      subscriptions?.map((subscription) => (
        <div key={subscription._id} className="subscription-container">
          <h3>{subscription.name}</h3>
          <button
            className="remove-button"
            onClick={() => handleRemoveUser(subscription._id)}
          >
            Remove
          </button>
          <ul>
            {subscription.gridDetails.map((gridDetail, index) => (
              <li key={gridDetail._id}>
                Date: {new Date(gridDetail.date).toLocaleDateString()}, Start
                Time: {gridDetail.startTime}, End Time: {gridDetail.endTime}
                <button
                  className="edit-button"
                  onClick={() => handleEditRow(subscription, gridDetail)}
                >
                  Edit Detail
                </button>
                <button
                  className="remove-button"
                  onClick={() =>
                    handleRemoveDate(subscription._id, gridDetail._id)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))
      : <>
      <span>No Subscription Added</span>
      </>
      }

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Subscription</h3>
            <form>
              <label htmlFor="editName">Name:</label>
              <input
                type="text"
                name="editName"
                value={editedSubscription.name || ""}
                onChange={handleNameChange}
                required
              />
              <label htmlFor="editDate">Date:</label>
              <input
                type="date"
                name="editDate"
                value={editedGridDetail.date || ""}
                onChange={(e) =>
                  setEditedGridDetail({
                    ...editedGridDetail,
                    date: e.target.value,
                  })
                }
                required
              />
              <label htmlFor="editStartTime">Start Time:</label>
              <input
                type="time"
                name="editStartTime"
                value={editedGridDetail.startTime || ""}
                onChange={(e) =>
                  setEditedGridDetail({
                    ...editedGridDetail,
                    startTime: e.target.value,
                  })
                }
                required
              />
              <label htmlFor="editEndTime">End Time:</label>
              <input
                type="time"
                name="editEndTime"
                value={editedGridDetail.endTime || ""}
                onChange={(e) =>
                  setEditedGridDetail({
                    ...editedGridDetail,
                    endTime: e.target.value,
                  })
                }
                required
              />
              <button type="button" onClick={handleSaveEdit}>
                Save
              </button>
              <button
                className="close-button"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <span>
        Add <Link to="/">New Subscribers</Link>
      </span>
    </div>
  );
};

export default SubscriptionList;
