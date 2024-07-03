package com.example.gestionprojets.Service;// HolidayRequestService.java

import com.example.gestionprojets.Entity.HolidayRequest;
import com.example.gestionprojets.Repositories.HolidayRequestRepository;
import com.example.gestionprojets.Service.HolidayRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HolidayRequestServiceImpl implements HolidayRequestService {
    @Autowired
    private HolidayRequestRepository holidayRequestRepository;

    public List<HolidayRequest> getAllRequests() {
        return holidayRequestRepository.findAll();
    }

    public List<HolidayRequest> getRequestsByEmployee(Long employeeId) {
        return holidayRequestRepository.findByEmployeeId(employeeId);
    }

    public HolidayRequest createRequest(HolidayRequest request) {
        request.setStatus("PENDING");
        return holidayRequestRepository.save(request);
    }

    public HolidayRequest approveRequest(Long requestId) {
        HolidayRequest request = holidayRequestRepository.findById(requestId).orElseThrow();
        request.setStatus("APPROVED");
        return holidayRequestRepository.save(request);
    }

    public HolidayRequest declineRequest(Long requestId) {
        HolidayRequest request = holidayRequestRepository.findById(requestId).orElseThrow();
        request.setStatus("DECLINED");
        return holidayRequestRepository.save(request);
    }


}
