package com.example.accessibilityactchecker.client;

import com.example.accessibilityactchecker.model.AIResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    public AIClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    private static final String MODEL = "gpt-4o";
    private static final int MAX_TOKENS = 500;



    public HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    public HttpEntity<Map<String, Object>> createRequest(String content, HttpHeaders headers) {
        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", "Analyze the following HTML content for accessibility issues and suggest fixes:\n\n" + content);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", MODEL);
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
