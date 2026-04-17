package com.smartcampus.dto;

import com.smartcampus.model.TicketCategory;
import com.smartcampus.model.TicketPriority;
import lombok.Data;

@Data
public class TicketRequestDto {
    private String title;
    private String description;
    private TicketCategory category;
    private TicketPriority priority;
    private String resourceId;
    private String location;
    private String preferredContact;
}
