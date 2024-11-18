package com.example.accessibilityactchecker.model;


import lombok.Data;

import java.util.List;

@Data
public class AIResponse {
    private List<Issue> issues;
    private List<Recommendation> recommendations;

}
