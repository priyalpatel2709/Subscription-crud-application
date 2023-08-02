import React, { useEffect, useState } from "react";
import "../style/SubscriptionList.css"; 
import {fetchSubscriptions } from '../services/subscriptionService'

const SubscriptionList = () => {
  // Dummy subscription data
  const [subscriptions, setSubscriptions] = useState([]);
  

  useEffect(()=>{
    loadData()
  },[])

  const loadData =async ()=>{
    try{
      const fetchedSubscriptions = await fetchSubscriptions();
      setSubscriptions(fetchedSubscriptions)
    }catch (err){
      console.log(err);
    }
  }

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedGridDetails, setEditedGridDetails] = useState({});

  const handleEditRow = (gridDetail) => {
    setEditedGridDetails(gridDetail);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.map((subscription) =>
        subscription.id === editedGridDetails.subscriptionId
          ? {
              ...subscription,
              gridDetails: subscription.gridDetails.map((gridDetail) =>
                gridDetail.date === editedGridDetails.date ? editedGridDetails : gridDetail
              ),
            }
          : subscription
      )
    );
    setShowEditModal(false);
  };

  const handleRemove = (subscriptionId, date) => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.map((subscription) => {
        if (subscription.id === subscriptionId) {
          return {
            ...subscription,
            gridDetails: subscription.gridDetails.filter((gridDetail) => gridDetail.date !== date),
          };
        }
        return subscription;
      })
    );
  };
  

  return (
    <div>
      <h2>Subscription List</h2>
      {subscriptions.map((subscription) => (
        <div key={subscription.id} className="subscription-container">
          <h3>{subscription.name}</h3>
          <ul>
            {subscription.gridDetails.map((gridDetail, index) => (
              <li key={index}>
                Date: {gridDetail.date}, Start Time: {gridDetail.startTime}, End Time: {gridDetail.endTime}
                <button className="edit-button" onClick={() => handleEditRow({ ...gridDetail, subscriptionId: subscription.id })}>
                  Edit
                </button>
                <button className="remove-button" onClick={() => handleRemove(subscription.id, gridDetail.date)}>Remove</button>
              </li>
              
            ))}
          </ul>
        </div>
      ))}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Grid Detail</h3>
            <form>
              <label htmlFor="editDate">Date:</label>
              <input
                type="date"
                name="editDate"
                value={editedGridDetails.date || ""}
                onChange={(e) => setEditedGridDetails({ ...editedGridDetails, date: e.target.value })}
                required
              />
              <label htmlFor="editStartTime">Start Time:</label>
              <input
                type="time"
                name="editStartTime"
                value={editedGridDetails.startTime || ""}
                onChange={(e) => setEditedGridDetails({ ...editedGridDetails, startTime: e.target.value })}
                required
              />
              <label htmlFor="editEndTime">End Time:</label>
              <input
                type="time"
                name="editEndTime"
                value={editedGridDetails.endTime || ""}
                onChange={(e) => setEditedGridDetails({ ...editedGridDetails, endTime: e.target.value })}
                required
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button className="close-button" onClick={() => setShowEditModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
