package com.example.accessibilityactchecker.service;

import com.example.accessibilityactchecker.client.AIClient;
import com.example.accessibilityactchecker.model.AIResponse;
import com.example.accessibilityactchecker.model.AccessibilityReport;
import org.springframework.stereotype.Service;

@Service
public class AccessibilityService {

    private final AIClient aiClient;

    public AccessibilityService(AIClient aiClient) {
        this.aiClient = aiClient;
    }

    public AccessibilityReport analyze(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }

        AIResponse aiResponse = aiClient.analyzeAccessibility(content);

        if (aiResponse == null || aiResponse.getIssues() == null || aiResponse.getRecommendations() == null) {
            throw new RuntimeException("Failed to get valid AI response");
        }

        return new AccessibilityReport(aiResponse.getIssues(), aiResponse.getRecommendations());
    }
}