package com.smartcampus.service;

import com.smartcampus.dto.BookingDto;
import com.smartcampus.model.Booking;
import com.smartcampus.model.BookingStatus;
import com.smartcampus.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public Booking createBooking(BookingDto bookingDto, String userEmail) {
        Booking booking = Booking.builder()
                .userEmail(userEmail)
                .resourceId(bookingDto.getResourceId())
                .resourceName(bookingDto.getResourceName())
                .date(bookingDto.getDate())
                .timeRange(bookingDto.getTimeRange())
                .status(BookingStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getMyBookings(String userEmail) {
        return bookingRepository.findByUserEmail(userEmail);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking updateBookingStatus(String id, BookingStatus status, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        booking.setReason(reason);
        return bookingRepository.save(booking);
    }
}
