package com.example.accessibilityactchecker.client;

import com.example.accessibilityactchecker.model.AIResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
public class AIClient {

    private final RestTemplate restTemplate;

    @Value("${ai.api.key}")
    private String apiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/completions";

    public AIClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public AIResponse analyzeAccessibility(String content) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "text-davinci-003");
        requestBody.put("prompt", "Analyze the following HTML content for accessibility issues and suggest fixes: " + content);
        requestBody.put("max_tokens", 500);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<AIResponse> response = restTemplate.postForEntity(OPENAI_URL, request, AIResponse.class);
        return response.getBody();
    }
}
