package com.example.accessibilityactchecker.service;

import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SaleniumService {

    public static String fetchHtmlContentWithSelenium(String url) {

        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Run in headless mode
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox"); // Added for Docker environments
        options.addArguments("--disable-dev-shm-usage"); // Handle shared memory issues

        WebDriver driver = new ChromeDriver(options);
        try {
            log.info("Fetching HTML content for URL: {}", url);
            driver.get(url); // Navigate to the URL
            String htmlContent = driver.getPageSource(); // Get the rendered HTML
            log.info("Successfully fetched HTML content for URL: {}", url);
            return htmlContent;
        } catch (Exception e) {
            log.error("Error while fetching HTML content for URL: {}", url, e);
            throw new RuntimeException("Failed to fetch HTML content", e);
        } finally {
            driver.quit(); // Close the browser
        }
    }
}
