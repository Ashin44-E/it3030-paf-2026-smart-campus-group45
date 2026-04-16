package com.smartcampus.service;

import com.smartcampus.dto.ResourceDto;
import com.smartcampus.model.Resource;

public interface ResourceService {
    Resource createResource(ResourceDto resourceDto, String adminEmail);
}
