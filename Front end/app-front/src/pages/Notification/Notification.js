import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Notification({ onMarkAsRead }) {
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
      if (AuthenticatedEmployee?.role === "ChefDeProjet") {
        result = await axios.get('http://localhost:8085/notifications/all');
        const filteredNotifications = result.data.filter(notification =>
          notification.message.includes("Demande de congé de")
        );
        console.log("Filtered Notifications for ChefDeProjet:", filteredNotifications);
        setNotifications(filteredNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else if (AuthenticatedEmployee) {
        result = await axios.get(`http://localhost:8085/notifications/employee/${AuthenticatedEmployee.id}`);
        console.log("Notifications for Employee:", result.data);
        setNotifications(result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.post(`http://localhost:8085/notifications/${notificationId}/mark-as-read`);
      const updatedNotifications = notifications.map(notification =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      );
      setNotifications(updatedNotifications);
      onMarkAsRead && onMarkAsRead(); // Call the callback to update the unread count
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const filteredNotifications = AuthenticatedEmployee?.role === "ChefDeProjet"
    ? notifications // Show filtered notifications for ChefDeProjet
    : notifications.filter(notification => !notification.message.includes("Demande de congé"));

  return (
    <div className="container">
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="p-4">Message</th>
              <th className="p-4">Date</th>
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
                      Marquer comme lu
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
