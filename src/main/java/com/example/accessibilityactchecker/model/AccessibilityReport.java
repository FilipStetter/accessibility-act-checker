package com.example.accessibilityactchecker.model;


import lombok.Data;
import java.util.List;

@Data
public class AccessibilityReport {
    private List<Issue> issues;
    private List<Recommendation> recommendations;


    public AccessibilityReport(List<Issue> issues, List<Recommendation> recommendations) {
    }
}
