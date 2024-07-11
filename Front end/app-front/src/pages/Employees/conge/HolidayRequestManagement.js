// HolidayRequestManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HolidayRequestManagement = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8085/holiday-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error loading holiday requests', error);
    }
  };

  const sendNotification = async (employeeId, message) => {
    try {
      await axios.post('http://localhost:8085/notifications/create', {
        employeeId: employeeId,
        message: message,
      });
    } catch (error) {
      console.error('Error sending notification', error);
    }
  };


  const handleApprove = async (requestId) => {
    try {
      await axios.post(`http://localhost:8085/holiday-requests/approve/${requestId}`);
      const approvedRequest = requests.find(request => request.id === requestId);
      if (approvedRequest) {
      await sendNotification(approvedRequest.employee.id, `Votre demande de congé du ${approvedRequest.startDate} au ${approvedRequest.endDate} a été approuvée.`);
      }
      loadRequests();
    } catch (error) {
      console.error('Error approving request', error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await axios.post(`http://localhost:8085/holiday-requests/decline/${requestId}`);
      const declinedRequest = requests.find(request => request.id === requestId);
      if (declinedRequest) {
      await sendNotification(declinedRequest.employee.id, `Votre demande de congé du ${declinedRequest.startDate} au ${declinedRequest.endDate} a été refusée.`);
      }
      loadRequests();
    } catch (error) {
      console.error('Error declining request', error);
    }
  };

  const greyColors = ["#808080"];
  const greenColors = ["#008000", "#228B22", "#4F7942"];

  const getRandomCommonColorGrey = () => {
    const randomIndex = Math.floor(Math.random() * greyColors.length);
    return greyColors[randomIndex];
  };

  return (
    <div>
      <div className="container">
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Collaborateur</th>
              <th className="p-4">Date debut</th>
              
              <th className="p-4">Date fin</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td><span
                            className="tag m-1 employee-column mx-3"
                            style={{
                              backgroundColor: getRandomCommonColorGrey(),
                            }}
                          >
                            {request.employee.name}
                          </span></td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'PENDING' && (
                  <>
                    <button onClick={() => handleApprove(request.id)} className="btn  btn-orange-primary-edit mx-2">Approve</button>
                    <button onClick={() => handleDecline(request.id)} className="btn  btn-orange-outline ">Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
      
    </div>
  );
};

export default HolidayRequestManagement;
