package com.example.accessibilityactchecker.service;

import com.example.accessibilityactchecker.client.AIClient;
import com.example.accessibilityactchecker.model.AIResponse;
import com.example.accessibilityactchecker.model.AccessibilityReport;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class AccessibilityService {

    private final AIClient aiClient;
    private final ObjectMapper objectMapper;

    public AccessibilityService(AIClient aiClient, ObjectMapper objectMapper) {
        this.aiClient = aiClient;
        this.objectMapper = objectMapper;
    }

    public AccessibilityReport analyze(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }

        HttpHeaders headers = aiClient.createHeaders();
        HttpEntity<Map<String, Object>> request = aiClient.createRequest(content, headers);

        log.info("Sending request to OpenAI for accessibility analysis...");
        String responseJson = aiClient.getResponseJson(request);

        log.info("Received response: {}", responseJson);

        try {
            AccessibilityReport report = objectMapper.readValue(responseJson, AccessibilityReport.class);
            log.info("Accessibility analysis completed successfully.");
            return report;
        } catch (Exception e) {
            log.error("Failed to parse response into AccessibilityReport: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to parse accessibility analysis response", e);
        }
    }
}