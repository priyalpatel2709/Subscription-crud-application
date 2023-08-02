import React, { useEffect, useState } from "react";
import "../style/SubscriptionList.css"; 
import {fetchSubscriptions,deleteSubscriptionDate,deleteSubscription } from '../services/subscriptionService'
import { Link } from "react-router-dom";

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

  const handleRemoveDate = async (subscriptionId, date) => {
    try{
      let remove = await deleteSubscriptionDate(subscriptionId, date)
      loadData()
      console.log(remove);
    }catch (err){
      console.log(err);
    }
  };

  const handleRemoveUser = async (id)=>{
    try{
      let result =  await deleteSubscription(id)
      loadData()
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }
  

  return (
    <div>
      <h2>Subscription List</h2>
      {subscriptions.map((subscription) => (
        <div key={subscription._id} className="subscription-container">
          <h3>{subscription.name}</h3> 
          <button className="remove-button" onClick={() => handleRemoveUser(subscription._id)}>Remove</button>
          <ul>
            {subscription.gridDetails.map((gridDetail, index) => (
              <li key={index}>
                Date: {gridDetail.date}, Start Time: {gridDetail.startTime}, End Time: {gridDetail.endTime}
                <button className="edit-button" onClick={() => handleEditRow({ ...gridDetail, subscriptionId: subscription.id })}>
                  Edit
                </button>
                <button className="remove-button" onClick={() => handleRemoveDate(subscription._id, gridDetail._id)}>Remove</button>
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
            <span>
       
       Add <Link to="/">New Subscribers</Link>
     </span>
    </div>
  );
};

export default SubscriptionList;
