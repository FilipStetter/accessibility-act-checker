package com.example.accessibilityactchecker.controller;


import com.example.accessibilityactchecker.model.AccessibilityReport;
import com.example.accessibilityactchecker.model.AccessibilityRequest;
import com.example.accessibilityactchecker.service.AccessibilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accessibility")
public class AccessibilityController {

    private final AccessibilityService accessibilityService;

    public AccessibilityController(AccessibilityService accessibilityService) {
        this.accessibilityService = accessibilityService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AccessibilityReport> analyzeContent(@RequestBody AccessibilityRequest request) {
        AccessibilityReport report = accessibilityService.analyze(request.getContent());
        return ResponseEntity.ok(report);
    }
}