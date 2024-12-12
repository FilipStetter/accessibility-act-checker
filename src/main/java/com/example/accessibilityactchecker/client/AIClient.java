package com.example.accessibilityactchecker.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Slf4j
@Component
public class AIClient {

    private final RestTemplate restTemplate;

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    private static final String MODEL = "gpt-4o";
    private static final int MAX_TOKENS = 500;

    public AIClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }





    public HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    public HttpEntity<Map<String, Object>> createRequest(String content, HttpHeaders headers) {
        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content",
                "You are an expert in web accessibility. Analyze the following HTML content for accessibility issues using the WCAG 2.2 guidelines. " +
                        "Always provide the response as valid JSON in the following format:\n\n" +
                        "{\n" +
                        "  \"issues\": [\n" +
                        "    {\n" +
                        "      \"description\": \"[Detailed description of the issue]\",\n" +
                        "      \"severity\": \"[Low | Medium | High | Critical]\",\n" +
                        "      \"recommendation\": \"[Detailed recommendation to fix the issue]\"\n" +
                        "    }\n" +
                        "  ],\n" +
                        "  \"summary\": {\n" +
                        "    \"totalIssues\": [number],\n" +
                        "    \"recommendations\": [number]\n" +
                        "  }\n" +
                        "}\n\n" +
                        "If no issues are found, respond with the following JSON:\n\n" +
                        "{\n" +
                        "  \"issues\": [],\n" +
                        "  \"summary\": {\n" +
                        "    \"totalIssues\": 0,\n" +
                        "    \"recommendations\": 0\n" +
                        "  }\n" +
                        "}\n\n" +
                        "Do not provide any additional text or explanation outside of this JSON format.\n\n" +
                        "Here is the HTML content to analyze:\n" +
                        content);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", MODEL);
        requestBody.put("temperature", 0.2);
        requestBody.put("messages", List.of(message));
        requestBody.put("max_tokens", MAX_TOKENS);

        return new HttpEntity<>(requestBody, headers);
    }

    public String getResponseJson(HttpEntity<Map<String, Object>> request) {
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_URL, request, String.class);

            if (response.getBody() == null) {
                log.warn("Received an empty response body from OpenAI.");
                throw new RuntimeException("Failed to analyze accessibility: Empty response body");
            }

            return response.getBody();
        } catch (Exception e) {
            log.error("Error while getting response from OpenAI: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch accessibility analysis", e);
        }
    }
}
