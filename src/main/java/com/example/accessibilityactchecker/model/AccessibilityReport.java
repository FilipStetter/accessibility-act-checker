package com.example.accessibilityactchecker.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

        public Issue(String description, String severity) {
            this.description = description;
            this.severity = severity;
        }
    }

    @Data
    public static class Recommendation {
        private String fix;
        private String explanation;

        public Recommendation(String fix, String explanation) {
            this.fix = fix;
            this.explanation = explanation;
        }
    }
}

