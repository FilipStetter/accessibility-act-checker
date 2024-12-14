package com.example.accessibilityactchecker.model;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AccessibilityReport {
    private List<Issue> issues = new ArrayList<>();
    private List<Recommendation> recommendations = new ArrayList<>();


    @Data
    public static class Issue {
        private String description;
        private String severity;
        private String faultyCode;

        public Issue(String description, String severity, String faultyCode) {
            this.description = description;
            this.severity = severity;
            this.faultyCode = faultyCode;
        }
    }

    @Data
    public static class Recommendation {
        private String recommendation;
        private String explanation;
        private String correctCode;

        public Recommendation(String recommendation, String explanation, String correctCode) {
            this.recommendation = recommendation;
            this.explanation = explanation;
            this.correctCode = correctCode;
        }
    }
}

