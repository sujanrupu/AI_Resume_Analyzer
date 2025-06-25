package com.resumeanalyzer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AnalyzerService {

    private static final String GEMINI_API_KEY = "AIzaSyBV-WuZ4o2Ja57tgdGZQlfQoxy07Fmy9Zg";

    public String process(MultipartFile file, String jd) {
        String resumeText = extractPdfText(file);

        if (resumeText.startsWith("Failed")) {
            return resumeText;
        }

        String prompt = "You are a professional ATS system. Provide section-wise feedback for this resume based on the following Job Description(just provide strength and weakness for each section individually  nothing else), do not provide any introduction or overall feedback or conclusion, make every section heading with number, such 1, 2, ..:\n\n"
                + jd + "\n\nResume:\n" + resumeText;

        return callGeminiAPI(prompt);
    }

    /**
     * Extracts plain text from a PDF file using Apache PDFBox
     */
    public String extractPdfText(MultipartFile file) {
        File tempFile = null;
        try {
            // Save uploaded file to a temporary file
            tempFile = File.createTempFile("resume-", ".pdf");
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(file.getBytes());
            }

            // Load PDF safely using Loader
            try (PDDocument document = Loader.loadPDF(tempFile)) {
                PDFTextStripper stripper = new PDFTextStripper();
                return stripper.getText(document);
            }
        } catch (Exception e) {
            return "Failed to read PDF: " + e.getMessage();
        } finally {
            // Cleanup temporary file
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }

    /**
     * Sends the prompt to Gemini API and returns the response
     */
    private String callGeminiAPI(String prompt) {
        try {
            String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;

            ObjectMapper mapper = new ObjectMapper();
            String escapedPrompt = mapper.writeValueAsString(prompt); // Escapes special characters properly

            String jsonBody = "{ \"contents\": [{ \"parts\": [{ \"text\": " + escapedPrompt + " }] }] }";

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();

        } catch (Exception e) {
            return "Error contacting AI: " + e.getMessage();
        }
    }
}
