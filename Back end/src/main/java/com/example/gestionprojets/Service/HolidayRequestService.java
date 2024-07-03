package com.example.gestionprojets.Service;

import com.example.gestionprojets.Entity.HolidayRequest;

import java.util.List;

public interface HolidayRequestService {
    List<HolidayRequest> getAllRequests();

    List<HolidayRequest> getRequestsByEmployee(Long employeeId);

    HolidayRequest createRequest(HolidayRequest request);
    HolidayRequest approveRequest(Long requestId);
    HolidayRequest declineRequest(Long requestId);
}
