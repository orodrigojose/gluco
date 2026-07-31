package dev.rodrigojse.api.controller;

import dev.rodrigojse.api.database.model.GlucoseEntity;
import dev.rodrigojse.api.dto.GlucoseDTO;
import dev.rodrigojse.api.service.GlucoseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/glico/")
@Validated
public class GlucoseController {
    @Autowired
    private GlucoseService glucoseService;

    @GetMapping("/{id}")
    public ResponseEntity<GlucoseDTO> get(@PathVariable UUID id) throws Exception {
        return ResponseEntity.ok(glucoseService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<GlucoseEntity>> getAll() {
        return ResponseEntity.ok(glucoseService.getAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<GlucoseDTO> create(@RequestBody @Valid GlucoseDTO dto) throws Exception {
        var response = glucoseService.create(dto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GlucoseDTO> update(@PathVariable UUID id, @RequestBody GlucoseDTO dto) throws Exception {
        return ResponseEntity.ok(glucoseService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        glucoseService.delete(id);
        return ResponseEntity.ok("Glucose log #" + id + " has been deleted");
    }
}
