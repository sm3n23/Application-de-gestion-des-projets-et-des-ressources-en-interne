// MyHolidayRequests.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const MyHolidayRequests = ({ onClose }) => {
  const { AuthenticatedEmployee } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (AuthenticatedEmployee) {
      loadRequests();
    }
  }, [AuthenticatedEmployee]);

  const loadRequests = async () => {
    try {
      const result = await axios.get(`http://localhost:8085/holiday-requests/my-requests?username=${AuthenticatedEmployee.username}`);
      setRequests(result.data);
    } catch (error) {
      console.error('Failed to load holiday requests:', error);
    }
  };

  return (
    <div>
      <h4 className='text-conge'>Mes demandes</h4>
      <div className="table-container my-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Date debut</th>
              <th className="p-4">Date fin</th>
              <th className="p-4">Status</th>
              
            </tr>
          </thead>
          <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.status}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
      
  );
};

export default MyHolidayRequests;
