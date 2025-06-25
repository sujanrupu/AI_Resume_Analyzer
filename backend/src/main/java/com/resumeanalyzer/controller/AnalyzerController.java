package com.resumeanalyzer.controller;

import com.resumeanalyzer.service.AnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/analyze")
public class AnalyzerController {

    @Autowired
    private AnalyzerService analyzerService;

    @PostMapping("/resume")
    public ResponseEntity<?> analyzeResume(@RequestParam("file") MultipartFile file,
                                           @RequestParam("jd") String jd) {
        String result = analyzerService.process(file, jd);
        return ResponseEntity.ok(result);
    }
}