package com.smartcampus.controller;

import com.smartcampus.dto.ResourceDto;
import com.smartcampus.model.Resource;
import com.smartcampus.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Resource> createResource(@RequestBody ResourceDto resourceDto, Authentication authentication) {
        String adminEmail = authentication.getName();
        Resource createdResource = resourceService.createResource(resourceDto, adminEmail);
        return new ResponseEntity<>(createdResource, HttpStatus.CREATED);
    }
}
