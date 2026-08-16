package dev.rodrigojse.api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.rodrigojse.api.database.model.GlucoseEntity;
import dev.rodrigojse.api.dto.GlucoseDTO;
import dev.rodrigojse.api.response.ApiResponse;
import dev.rodrigojse.api.service.GlucoseService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/glico/")
@Validated
public class GlucoseController {
    @Autowired
    private GlucoseService glucoseService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GlucoseDTO>> get(@PathVariable UUID id) throws Exception {
        return ResponseEntity.ok(ApiResponse.success(glucoseService.getById(id), "Glucose record retrieved successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GlucoseDTO>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(glucoseService.getAll(), "Glucose record retrieved successfully"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResponse<GlucoseDTO>> create(@RequestBody @Valid GlucoseDTO dto) throws Exception {
        var response = glucoseService.create(dto);
        return ResponseEntity.ok(ApiResponse.success(response, "Glucose record created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GlucoseDTO>> update(@PathVariable UUID id, @RequestBody GlucoseDTO dto) throws Exception {
        return ResponseEntity.ok(ApiResponse.success(glucoseService.update(id, dto), "Glucose record updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable UUID id) {
        glucoseService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Glucose record #" + id + " has been deleted"));
    }
}
