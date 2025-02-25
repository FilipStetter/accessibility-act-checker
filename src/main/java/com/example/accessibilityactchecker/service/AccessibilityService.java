package com.example.accessibilityactchecker.service;

import com.example.accessibilityactchecker.client.AIClient;
import com.example.accessibilityactchecker.model.AccessibilityReport;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.validator.routines.UrlValidator;
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

        if (isUrl(content)) {
            log.info("Content is a URL. Fetching HTML content using PlaywrightService...");
            content = SaleniumService.fetchHtmlContentWithSelenium(content);

            if (content == null || content.trim().isEmpty()) {
                throw new RuntimeException("Failed to fetch HTML content from the provided URL");
            }

            log.info("HTML content fetched successfully.");
        }

        HttpHeaders headers = aiClient.createHeaders();
        HttpEntity<Map<String, Object>> request = aiClient.createRequest(content, headers);

        try {
            log.info("Sending request to OpenAI for accessibility analysis...");
            String responseJson = aiClient.getResponseJson(request);

            log.info("Raw OpenAI response: {}", responseJson);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseJson);
            String messageContent = rootNode.path("choices").get(0).path("message").path("content").asText();
            messageContent = messageContent.replaceAll("^```json\\s*|\\s*```$", "");

            AccessibilityReport report = parseMessageContent(messageContent);
            log.info("Accessibility analysis completed successfully.");
            return report;
        } catch (Exception e) {
            log.error("Error analyzing accessibility: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to analyze accessibility", e);
        }
    }

    private boolean isUrl(String content) {
        UrlValidator urlValidator = new UrlValidator(new String[]{"http", "https"});
        return urlValidator.isValid(content);
    }

    private AccessibilityReport parseMessageContent(String content) {
        try {
            JsonNode root = objectMapper.readTree(content);
            List<AccessibilityReport.Issue> issues = new ArrayList<>();
            List<AccessibilityReport.Recommendation> recommendations = new ArrayList<>();

            JsonNode issuesNode = root.path("issues");
            if (issuesNode.isArray()) {
                for (JsonNode issueNode : issuesNode) {
                    String description = issueNode.path("description").asText();
                    String severity = issueNode.path("severity").asText();
                    String recommendation = issueNode.path("recommendation").asText();
                    String faultyCode = issueNode.path("faultyCode").asText();
                    String correctCode = issueNode.path("correctCode").asText();

                    issues.add(new AccessibilityReport.Issue(description, severity, faultyCode));
                    recommendations.add(new AccessibilityReport.Recommendation(recommendation, severity, correctCode));
                }
            }

            AccessibilityReport report = new AccessibilityReport();
            report.setIssues(issues);
            report.setRecommendations(recommendations);
            return report;
        } catch (Exception e) {
            log.error("Failed to parse accessibility report JSON: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to parse accessibility report", e);
        }
    }

}