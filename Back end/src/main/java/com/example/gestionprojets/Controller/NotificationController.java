package com.example.gestionprojets.Controller;

import com.example.gestionprojets.Dto.NotificationCreateDto;
import com.example.gestionprojets.Entity.Notification;
import com.example.gestionprojets.Repositories.NotificationRepository;
import com.example.gestionprojets.Service.NotFoundException;
import com.example.gestionprojets.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;


    @GetMapping("/all")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createNotification(@RequestBody NotificationCreateDto notificationCreateDto) {
        notificationService.createNotification(notificationCreateDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/mark-as-read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Notification>> getNotificationsForEmployee(@PathVariable Long employeeId) {
        List<Notification> notifications = notificationService.getNotificationsForEmployee(employeeId);
        return ResponseEntity.ok(notifications);
    }

}
