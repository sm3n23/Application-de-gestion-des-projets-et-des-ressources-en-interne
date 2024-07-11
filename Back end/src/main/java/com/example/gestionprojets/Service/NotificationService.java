package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.NotificationCreateDto;
import com.example.gestionprojets.Dto.NotificationDto;
import com.example.gestionprojets.Entity.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getAllNotifications();
    void createNotification(NotificationCreateDto notificationCreateDto);

    List<NotificationDto> getUnreadNotifications(Long employeeId);

    void markAsRead(Long notificationId);

    List<Notification> getNotificationsForEmployee(Long employeeId);
}
