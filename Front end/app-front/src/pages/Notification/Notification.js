import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const { AuthenticatedEmployee } = useContext(AuthContext);

  useEffect(() => {
    if (AuthenticatedEmployee) {
      loadNotifications();
    }
  }, [AuthenticatedEmployee]);

  const loadNotifications = async () => {
    try {
      let result;
      if (AuthenticatedEmployee.role === "ChefDeProjet") {
        result = await axios.get('http://localhost:8085/notifications/all');
      } else {
        result = await axios.get(`http://localhost:8085/notifications/employee/${AuthenticatedEmployee.id}`);
      }

      const sortedNotifications = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.post(`http://localhost:8085/notifications/${notificationId}/mark-as-read`);
      setNotifications(notifications.map(notification =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const filteredNotifications = AuthenticatedEmployee.role === "ChefDeProjet"
    ? notifications // Show all notifications for ChefDeProjet
    : notifications.filter(notification => !notification.message.includes("Demande de congé"));

  return (
    <div className="container">
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Message</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification) => (
              <tr key={notification.id}>
                <td className="p-4">{notification.message}</td>
                <td className="p-4">{new Date(notification.createdAt).toLocaleString()}</td>
                <td className="p-4">
                  {!notification.read && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
