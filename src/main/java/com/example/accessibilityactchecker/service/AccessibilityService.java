package com.example.accessibilityactchecker.service;

import com.example.accessibilityactchecker.client.AIClient;
import com.example.accessibilityactchecker.model.AccessibilityReport;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

        try {
            log.info("Sending request to OpenAI for accessibility analysis...");
            String responseJson = aiClient.getResponseJson(request);

            log.info("Raw OpenAI response: {}", responseJson);

            // Extract choices[0].message.content from the response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseJson);
            String messageContent = rootNode.path("choices").get(0).path("message").path("content").asText();

            // Parse messageContent into an AccessibilityReport
            AccessibilityReport report = parseMessageContent(messageContent);
            log.info("Accessibility analysis completed successfully.");
            return report;
        } catch (Exception e) {
            log.error("Error analyzing accessibility: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to analyze accessibility", e);
        }
    }

    private AccessibilityReport parseMessageContent(String content) {
        AccessibilityReport report = new AccessibilityReport();
        List<AccessibilityReport.Issue> issues = new ArrayList<>();
        List<AccessibilityReport.Recommendation> recommendations = new ArrayList<>();

        String[] lines = content.split("\n");
        String currentIssue = null;
        String currentSeverity = "N/A";

        for (String line : lines) {
            line = line.trim();
            if (line.matches("^\\d+\\.\\s+.*")) { // Match issue descriptions
                if (currentIssue != null) {
                    issues.add(new AccessibilityReport.Issue(currentIssue, currentSeverity));
                }
                currentIssue = line.replaceFirst("^\\d+\\.\\s+", "").split(" - Severity:")[0].trim();
                currentSeverity = extractSeverity(line);
            } else if (line.startsWith("- Recommendation:")) { // Match recommendations
                if (currentIssue != null) {
                    String recommendation = line.replaceFirst("- Recommendation:", "").trim();
                    recommendations.add(new AccessibilityReport.Recommendation(recommendation, currentSeverity));
                }
            }
        }
        if (currentIssue != null) {
            issues.add(new AccessibilityReport.Issue(currentIssue, currentSeverity));
        }

        report.setIssues(issues);
        report.setRecommendations(recommendations);
        return report;
    }

    private String extractSeverity(String text) {
        if (text.contains("Low")) return "Low";
        if (text.contains("Medium")) return "Medium";
        if (text.contains("High")) return "High";
        if (text.contains("Critical")) return "Critical";
        return "Low";
    }
}