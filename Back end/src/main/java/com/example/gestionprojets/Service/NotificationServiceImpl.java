package com.example.gestionprojets.Service;

import com.example.gestionprojets.Dto.NotificationCreateDto;
import com.example.gestionprojets.Dto.NotificationDto;
import com.example.gestionprojets.Entity.Employee;
import com.example.gestionprojets.Entity.Notification;
import com.example.gestionprojets.Repositories.EmployeeRepository;
import com.example.gestionprojets.Repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }


    public void createNotification(NotificationCreateDto notificationCreateDto) {
        Employee employee = employeeRepository.findById(notificationCreateDto.getEmployeeId())
                .orElseThrow(() -> new NotFoundException("Employee not found"));

        Notification notification = new Notification();
        notification.setMessage(notificationCreateDto.getMessage());
        notification.setEmployee(employee);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    public List<NotificationDto> getUnreadNotifications(Long employeeId) {
        List<Notification> notifications = notificationRepository.findByEmployeeIdAndReadFalse(employeeId);
        return notifications.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotFoundException("Notification not found"));
        notification.setRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        return notificationRepository.findByEmployee(employee);
    }

    private NotificationDto convertToDto(Notification notification) {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setId(notification.getId());
        notificationDto.setMessage(notification.getMessage());
        notificationDto.setRead(notification.isRead());
        notificationDto.setCreatedAt(notification.getCreatedAt());
        return notificationDto;
    }
}
